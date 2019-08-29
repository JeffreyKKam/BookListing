using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string SolrUrl { get; set; }
        public string Collection { get; set; }
    }
}
