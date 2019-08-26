import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../_services/book.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Book } from '../_models'

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html'
})
export class BookAddComponent {
  public book: Book
  bookForm: FormGroup;
  title: string;
  average_rating: number;
  isbn: string;
  isbn13: string;
  language_code: string;
  pages: number;
  author: string;

  constructor(private bookService: BookService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'average_rating': [null, Validators.required],
      'isbn': [null, Validators.required],
      'isbn13': [null, Validators.required],
      'language_code': [null, Validators.required],
      'pages': [null, Validators.required],
      'author': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.bookService.addBook(form)
      .subscribe(result => {
        let id = result['id'];
        this.router.navigate(['/book', id])
      }, (err) => {
        console.log(err);
      })
  }

}


