import { SolrParams } from "./solrParams";

export class SolrResponseHeader {
  warnings: string;
  status: number;
  QTime: number;
  parameters: SolrParams
}
