
import { ActivatedRoute, Router } from '@angular/router';
import { BookAddComponent } from './book-add.component'
import { BookService } from '../_services/book.service';
import { Book } from '../_models';

import { TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';


describe('Book Add Component Test', () => {
  let bookComponent: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  let dummyBook: Book;

  beforeEach(() => {
    dummyBook = dummyBook = { id: "1", title: "title", author: "auth", average_rating: 4, bookNum: 1, isbn: "123", isbn13: "1234", language_code: "eng", pages: 2, reviews_count: 1, ratings_count: 1 } as Book;
    const bookSpy = jasmine.createSpyObj('BookService', ['addBook']);
    bookSpy.addBook.and.returnValue(of(dummyBook));

    TestBed.configureTestingModule({
      declarations: [BookAddComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: bookSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAddComponent);
    bookComponent = fixture.componentInstance;
  });

  describe('should load form', () => {
    it('should load book add form', () => {
      fixture.detectChanges();
      expect(bookComponent).toBeTruthy();
    });

    it('should be an empty form', () => {
      fixture.detectChanges();
      let title = fixture.nativeElement.querySelector('input');
      expect(title.value).toBe('');
    })

    afterAll(() => {
      TestBed.resetTestingModule();
    });
  })

});
