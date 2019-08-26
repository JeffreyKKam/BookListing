using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr.Models
{
    public class SolrResponse
    {
        public SolrResponseHeader responseHeader { get; set; }
        public SolrResponseData response { get; set; }
    }

    public class SolrResponseHeader
    {
        public string warnings { get; set; }
        public int status { get; set; }
        public decimal QTime { get; set; }
        [JsonProperty("params")]
        public SolrParams parameters {get;set;}
    }

    public class SolrParams
    {
        [JsonProperty("q")]
        public string query { get; set; }
        public string start { get; set; }
        public string rows { get; set; }
        public string facet { get; set; }
    }

    public class SolrResponseData
    {
        public int numFound { get; set; }
        public int start { get; set; }
        public List<SolrBook> docs { get; set; }
    }
}
