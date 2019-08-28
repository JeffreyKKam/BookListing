import { SolrResponseHeader } from "./solrResponseHeader";
import { SolrResponseData } from "./solrResponseData"
import { Facet } from "./facet"

export class SolrResponse {
  responseHeader: SolrResponseHeader;
  responseData: SolrResponseData;
  facet: Facet;
}
