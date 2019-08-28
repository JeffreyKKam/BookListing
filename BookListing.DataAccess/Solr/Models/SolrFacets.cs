using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr.Models
{
    public class SolrFacets
    {
        public SolrRatingRanges facet_ranges { get; set; }
    }

    public class SolrRatingRanges
    {
        // since we are only faceting on average rating at the moment this is all we will focus on
        [JsonProperty("average_rating")]
        public SolrRange rating { get; set; }
    }

    public class SolrRange
    {
        // When counts gets deserialized from the solr server it does so as an array of values ie:
        // "counts" : [ "0.0", 39, "0.5", 0 ...], where the first term is the begining of the range, 
        // and the next value is the count of that range start + gap value. 
        // Therefore there should always be an even number of records in the "counts" array
        public string[] counts { get; set; }
        public decimal gap { get; set; }
        public decimal start { get; set; }
        public decimal end { get; set; }

        public List<SolrRangeCount> rangeCounts
        {
            get
            {
                var list = new List<SolrRangeCount>();
                // there should be an even number of records in the counts array, otherwise something went wrong
                if (counts.Length % 2 != 0)
                {
                    return list;
                }
                for (var i = 0; i < counts.Length; i++)
                {
                    var beginRange = Convert.ToDecimal(counts[i++]);
                    var endRange = beginRange + gap;
                    var value = Convert.ToInt32(counts[i]);
                    list.Add(new SolrRangeCount { Start = beginRange, End = endRange, Count = value });

                }
                return list;
            }
        }
    }

    public class SolrRangeCount
    {
        public decimal Start { get; set; }
        public decimal End { get; set; }
        public int Count { get; set; }
    }

}
