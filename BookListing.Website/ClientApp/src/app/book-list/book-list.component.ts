import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent {
  public results;
  public baseURL;
  searchValue = '';
  page = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
    this.search(this.searchValue, this.page);
  }

  search(searchTerm, page) {

    this.http.get(this.baseURL + 'api/Book/Search', {
      params: { searchTerm: searchTerm, page : page }
    }).subscribe(result => {
      this.results = result;
    }, error => console.error(error));
  }

  // possibly used to get suggestions
  onKey(value: string) {
    this.searchValue = value;
  }
}


