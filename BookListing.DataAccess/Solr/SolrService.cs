using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using BookListing.DataAccess.Solr.Models;
using Newtonsoft.Json;
using RestSharp;

namespace BookListing.DataAccess.Solr
{
    public class SolrService : ISolrService
    {
        private string baseURL { get; set; }
        private string collection { get; set; }

        private const string query = "select?";

        private IRestClient _client;
        private IRestClient Client
        {
            get
            {
                if (_client == null)
                {
                    _client = new RestClient(baseURL);
#if !DEBUG
                    _client.Timeout = RequestTimeout;
#endif
                }
                return _client;
            }
        }

        public SolrService(string baseUrl, string collectionName)
        {
            this.baseURL = baseUrl;
            this.collection = collectionName;
        }
        
        public void IndexBook(Book book)
        {
            RestCall(BuildApiUrl(collection, "update", "json", "docs"), Method.POST, rq =>
            {
                rq.AddQueryParameter("commit", "true");
                rq.AddJsonBody(SolrBook.FromBook(book));
            });
        }

        public void IndexBooks(IEnumerable<Book> books)
        {
            var solrBooks = books.Select(SolrBook.FromBook);
            RestCall(BuildApiUrl(collection, "update"), Method.POST, rq =>
            {
                rq.AddQueryParameter("commit", "true");
                rq.AddJsonBody(solrBooks);
            });
        }

       
        public void DeleteBook(Guid id)
        {
            var body = $"{{ \"delete\" :  {{ \"id\" : \"{id}\"  }} }}";
            RestCall(BuildApiUrl(collection, "update"), Method.POST, rq =>
            {
                rq.AddQueryParameter("commit", "true");
                rq.AddParameter("text/json", body, ParameterType.RequestBody);
            });
        }

        public SolrResponse Query(string searchString = "", int page = 0, int pageSize = 10)
        {
            var result = RestCall<SolrResponse>(BuildApiUrl(collection, "query"), Method.GET, rq =>
            {
                rq.AddQueryParameter("q", string.IsNullOrWhiteSpace(searchString) ? "*.*" : $"text:{searchString}");
                rq.AddQueryParameter("rows", pageSize.ToString());
                rq.AddQueryParameter("start", (pageSize * page).ToString());
            });

            return result;
        }


        private string BuildApiUrl(params string[] paths)
        {
            return paths.Where(path => !string.IsNullOrWhiteSpace(path)).Aggregate(baseURL, (current, path) => current + "/" + path);
        }

        private string RestCall(string url, Method method, Action<IRestRequest> requestSetup = null)
        {
            var response = PerformRestCall(url, method, requestSetup);
            return response.Content;
        }

        private T RestCall<T>(string url, Method method, Action<IRestRequest> requestSetup = null)
            where T : class
        {
            var response = PerformRestCall(url, method, requestSetup);
            return JsonConvert.DeserializeObject<T>(response.Content);
        }

        private IRestResponse PerformRestCall(string url, Method method, Action<IRestRequest> requestSetup = null)
        {
            var request = new RestRequest(url, method);
            requestSetup?.Invoke(request);

            var response = Client.Execute(request);

            if (!response.IsSuccessful)
            {
                var ex = CreateExceptionFromResponse(response);
                throw ex;
            }

            return response;
        }

        private SolrApiException CreateExceptionFromResponse(IRestResponse response)
        {
            if (response.StatusCode == 0)
            {
                return SolrApiException.FromRestResponse(response);
            }
            else
            {
                var error = JsonConvert.DeserializeObject<SolrApiResponseHeader>(response.Content);
                return SolrApiException.FromApiError(error);
            }
        }

    }
}
