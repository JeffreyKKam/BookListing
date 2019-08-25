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

    constructor(private bookService: BookService) {    }

    ngOnInit() {
        this.search(this.searchValue, this.page);
    }

    search(searchTerm, page) {
        this.bookService.search(searchTerm, page).subscribe(results => {
            this.results = results;
        }, error => console.error(error));
    }

    // possibly used to get suggestions
    onKey(value: string) {
        this.searchValue = value;
    }
}


