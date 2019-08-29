import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit{
  public results;
  searchValue = '';
  page = 1;
  facetStart = null;
  facetEnd = null;
  filter = '';
  errorMessage = '';

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.search(this.searchValue, this.page, null, null);
  }

  search(searchTerm, page, facetStart, facetEnd) {
    this.searchValue = searchTerm;
    this.page = page;
    this.filter = '';
    if (facetStart && facetEnd) {
      this.facetStart = facetStart;
      this.facetEnd = facetEnd;
      this.filter = `average_rating:[ ${facetStart} TO ${facetEnd}]`;
    }
    this.bookService.search(this.searchValue, this.page, this.filter).subscribe(results => {
      this.results = results;
      this.errorMessage = "";
    }, error => {
        this.errorMessage = error;
    });
  }

  clearFilter() {
    this.search(this.searchValue, 1, null, null);
  }

  // possibly used to get suggestions
  onKey(value: string) {
    this.searchValue = value;
  }
}


