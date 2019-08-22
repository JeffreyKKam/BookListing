using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListing.DataAccess.Models;
using BookListing.DataAccess.Solr;
using BookListing.DataAccess.Solr.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookListing.Website.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private ISolrService SolrService { get; set; }
        private BookContext Context { get; set; }

        public BookController(BookContext bookContext, ISolrService solrService)
        {
            SolrService = solrService;
            Context = bookContext;
        }

        [HttpGet("[action]")]
        public SolrResponse Search(string searchTerm = "", int page = 0, int pageSize = 10)
        {
            var response = SolrService.Query(searchTerm, page, pageSize);
            return response;

        }

        [HttpPost("[action]")]
        public JsonResult Create(SolrBook book)
        {
            return new JsonResult("");
        }

        [HttpGet("[action]")]
        public Book Edit(Guid id)
        {
            return Context.Books.SingleOrDefault(m => m.Id == id);
        }

        [HttpPost("[action]")]
        public JsonResult Edit(Book book)
        {
            Context.Books.Update(book);
            Context.SaveChanges();
            SolrService.IndexBook(book);
            return new JsonResult("");
        }

        [HttpPost("[action]")]
        public JsonResult Delete(Guid id)
        {
            var book = Context.Books.SingleOrDefault(m => m.Id == id);
            if (book != null) {
                Context.Books.Remove(book);
                Context.SaveChanges();
                SolrService.DeleteBook(id);
            }
            return new JsonResult("");
        }
    }
}