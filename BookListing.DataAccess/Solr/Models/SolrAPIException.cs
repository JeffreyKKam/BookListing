using RestSharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Solr.Models
{
    public class SolrApiException : Exception
    {
        public string ErrorType { get; private set; }
        public string ServerStackTrace { get; private set; }
        public bool CouldNotConnect => ErrorType == null;

        public SolrApiException(string message) : base(message)
        {
        }

        public static SolrApiException FromApiError(SolrApiResponseHeader response)
        {
            return new SolrApiException($"status: { response.responseHeader.status }");
        }

        public static SolrApiException FromRestResponse(IRestResponse response)
        {
            return new SolrApiException(response.ErrorMessage);
        }
    }
}
