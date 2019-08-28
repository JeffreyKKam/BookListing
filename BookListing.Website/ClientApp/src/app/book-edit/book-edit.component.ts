import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookService } from '../_services/book.service';
import { Book } from '../_models'


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {
  public book: Book
  bookForm: FormGroup;
  id: string = '';
  title: string;
  average_rating: number;
  isbn: string;
  isbn13: string;
  language_code: string;
  pages: number;
  author: string;

  constructor(private bookService: BookService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'average_rating': [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      'isbn': [null, Validators.required],
      'isbn13': [null, Validators.required],
      'language_code': [null, Validators.required],
      'pages': [null, Validators.required],
      'author': [null, Validators.required]
    });
  }

  getBook(id) {
    this.bookService.getBook(id)
      .subscribe(data => {
        this.book = data;
        this.id = id;
        this.bookForm.setValue({
          'title': data.title,
          'average_rating': data.average_rating,
          'isbn': data.isbn,
          'isbn13': data.isbn13,
          'language_code': data.language_code,
          'pages': data.pages,
          'author': data.author, 
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.bookService.updateBook(this.id, form)
      .subscribe(result => {
        let id = result['id'];
        this.router.navigate(['/book', id])
      }, (err) => {
        console.log(err);
      })
  }
}


