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
        public int booknum { get; set; }
        public string title { get; set; }
        public decimal average_rating { get; set; }
        public string isbn { get; set; }
        public string isbn13 { get; set; }
        public string language_code { get; set; }
        public int pages { get; set; }
        public int ratings_count { get; set; }
        public int reviews_count { get; set; }
        public string author { get; set; }

        public static SolrBook FromBook(Book book)
        {
            return new SolrBook
            {
                id = book.Id,
                booknum = book.BookNum,
                title = book.Title,
                average_rating = book.AverageRating,
                isbn = book.ISBN,
                isbn13 = book.ISBN13,
                language_code = book.LanguageCode,
                pages = book.Pages,
                ratings_count = book.RatingsCount,
                reviews_count = book.ReviewCount,
                author = book.Author.Name,
            };
        }
    }
}
