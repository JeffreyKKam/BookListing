import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent {
  public results;
  public baseURL;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
    this.search("", 1);
  }

  search(searchTerm, page) {
    this.http.get(this.baseURL + 'api/Book/Search').subscribe(result => {
      this.results = result;
    }, error => console.error(error));
  }
}


