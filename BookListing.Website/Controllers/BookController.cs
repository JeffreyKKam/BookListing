using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListing.DataAccess.Models;
using BookListing.DataAccess.Solr;
using BookListing.DataAccess.Solr.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookListing.Website.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private ISolrService SolrService { get; set; }
        private BookContext Context { get; set; }

        public BookController(BookContext context, ISolrService solrService)
        {
            SolrService = solrService;
            Context = context;
        }

        [HttpGet("[action]")]
        public IActionResult Search(string searchTerm = "", int page = 0, int pageSize = 10, string filter = "")
        {
            var response = SolrService.Query(searchTerm, page, pageSize, filter);
            return Ok(response);

        }

        [HttpGet("{id}")]
        public IActionResult GetBook(Guid id)
        {
            var book = Context.Books
                    .Include(m => m.Author)
                    .SingleOrDefault(m => m.Id == id);
            if (book == null)
            {
                return NotFound("A book entity with the given Id does not exist");
            }
            return Ok(SolrBook.FromBook(book));
        }

        [HttpPost]
        public IActionResult Insert([FromBody]SolrBook book)
        {
            var dbBook = new Book();
            book.SaveToModel(Context, dbBook);
            Context.Books.Add(dbBook);
            Context.SaveChanges();
            SolrService.IndexBook(dbBook); 
            return Ok(SolrBook.FromBook(dbBook));
        }

        [HttpPut]
        public IActionResult Update([FromBody]SolrBook book)
        {
            var dbBook = Context.Books.SingleOrDefault(m => m.Id == book.id);
            if (dbBook == null)
            {
                return NotFound($"Book with id {book.id} was not found");
            }
            book.SaveToModel(Context, dbBook);
            Context.Books.Update(dbBook);
            Context.SaveChanges();
            SolrService.IndexBook(dbBook);
            return Ok(SolrBook.FromBook(dbBook));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var book = Context.Books.SingleOrDefault(m => m.Id == id);
            if (book == null)
            {
                return NotFound("A book entity with the given Id does not exist");

            }
            Context.Books.Remove(book);
            Context.SaveChanges();
            SolrService.DeleteBook(id);
            return Ok();
        }
    }
}