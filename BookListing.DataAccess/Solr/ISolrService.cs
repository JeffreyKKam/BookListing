using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr
{
    public interface ISolrService
    {
        /// <summary>
        /// Indexes a book entity object in Solr
        /// </summary>
        /// <param name="book"></param>
        void IndexBook(Book book);

        /// <summary>
        /// Index a list of book objects in solr
        /// </summary>
        /// <param name="book"></param>
        void IndexBooks(IEnumerable<Book> book);

        /// <summary>
        /// Deletes the book entity object from the Solr Indexes
        /// </summary>
        /// <param name="book"></param>
        void DeleteBook(Book book);

        /// <summary>
        /// Basic search string query
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        string Query(string searchString, int page, int pageSize);
    }
}
