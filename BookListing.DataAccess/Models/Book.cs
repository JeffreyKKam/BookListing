using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookListing.DataAccess.Models
{
    public class Book
    {
        [Key]
        public Guid Id { get; set; }
        public int BookNum { get; set; }
        public string Title { get; set; }
        public decimal AverageRating { get; set; }
        public string ISBN { get; set; }
        public string ISBN13 { get; set; }
        public string LanguageCode { get; set; }
        public int Pages { get; set; }
        public int RatingsCount { get; set; }
        public int ReviewCount { get; set; }
        public virtual Author Author { get; set; }

    }
}
