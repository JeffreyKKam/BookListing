using BookListing.DataAccess.Models;
using Csv;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using BookListing.DataAccess.Solr;

namespace BookListing.DataAccess.SampleData
{
    public static class SampleDataService
    {
        public static void ReadSampleData(BookContext context, ISolrService solrService)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string resourceName = "BookListing.DataAccess.SampleData.books.csv";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (!context.Books.Any())
                {
                    var authorList = new List<Author>();
                    var solrIndexList = new List<Book>();
                    var counter = 0;
                    foreach (var line in CsvReader.ReadFromStream(stream))
                    {
                        var book = new Book();
                        book.BookNum = Int32.TryParse(line[0], out int bookNum) ? bookNum : 0;
                        book.Title = line[1];
                        book.AverageRating = decimal.TryParse(line[3], out decimal rating) ? rating : 0;
                        book.ISBN = line[4];
                        book.ISBN13 = line[5];
                        book.LanguageCode = line[6];
                        book.Pages = Int32.TryParse(line[7], out int pages) ? pages : 0;
                        book.RatingsCount = Int32.TryParse(line[8], out int ratingCount) ? ratingCount : 0;
                        book.ReviewCount = Int32.TryParse(line[9], out int reviews) ? reviews : 0;


                        var authorName = line[2];
                        var author = context.Authors.SingleOrDefault(m => m.Name.ToLower() == authorName.ToLower());
                        if (author == null)
                        {
                            author = authorList.SingleOrDefault(m => m.Name.ToLower() == authorName.ToLower());
                            if (author == null)
                            {
                                author = new Author { Name = authorName };
                                authorList.Add(author);
                                context.Authors.Add(author);
                            }
                        }

                        book.Author = author;
                        solrIndexList.Add(book);
                        context.Books.Add(book);
                        counter++;
                        if(counter % 300 == 0)
                        {
                            context.SaveChanges();
                            solrService.IndexBooks(solrIndexList);
                            solrIndexList.Clear();
                        }
                    }
                }
            }
        }
    }
}
