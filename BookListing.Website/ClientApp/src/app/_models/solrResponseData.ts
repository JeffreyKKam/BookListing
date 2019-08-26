import { Book } from "./book";

export class SolrResponseData {
  numFound: number;
  start: number;
  docs: Book[];
}
