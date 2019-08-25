import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../_services/book.service';
import { Book } from '../_models'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
    public book: Book

    constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {      
        this.getBook(this.route.snapshot.params['id']);
    }

    getBook(id){
        this.bookService.getBook(this.route.snapshot.params['id'])
          .subscribe(data => {
            this.book = data;
          });
    }

    deleteBook(id) {
        this.bookService.deleteBook(id)
            .subscribe(result => {
              this.router.navigate(['/books']);
            })
    }
    
}


