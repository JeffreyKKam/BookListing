using BookListing.DataAccess.Models;
using BookListing.DataAccess.Solr.Models;
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
        /// <param name="id">Id of the book to delete</param>
        void DeleteBook(Guid id);

        /// <summary>
        /// Basic search string query
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        SolrResponse Query(string searchString, int page, int pageSize);
    }
}
