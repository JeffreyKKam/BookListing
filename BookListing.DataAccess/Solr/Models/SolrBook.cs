using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr.Models
{
    /// <summary>
    /// the object that will be indexed in solr
    /// </summary>
    public class SolrBook
    {
        public Guid id { get; set; }
        public int BookNum { get; set; }
        public string Title { get; set; }
        public decimal AverageRating { get; set; }
        public string ISBN { get; set; }
        public string ISBN13 { get; set; }
        public string LanguageCode { get; set; }
        public int Pages { get; set; }
        public int RatingsCount { get; set; }
        public int ReviewCount { get; set; }
        public string Author { get; set; }

        public static SolrBook FromBook(Book book)
        {
            return new SolrBook
            {
                id = book.Id,
                BookNum = book.BookNum,
                Title = book.Title,
                AverageRating = book.AverageRating,
                ISBN = book.ISBN,
                ISBN13 = book.ISBN13,
                LanguageCode = book.LanguageCode,
                Pages = book.Pages,
                RatingsCount = book.RatingsCount,
                ReviewCount = book.ReviewCount,
                Author = book.Author.Name,
            };
        }
    }
}
