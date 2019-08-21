using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr.Models
{
    public class SolrApiResponse
    {
        public string status { get; set; }
        public decimal QTime { get; set; }
    }

    public class SolrApiResponseHeader
    {
        public SolrApiResponse responseHeader { get; set; }
    }

}
