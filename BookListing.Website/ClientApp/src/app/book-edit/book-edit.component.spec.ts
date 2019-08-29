
import { ActivatedRoute, Router } from '@angular/router';
import { BookEditComponent } from './book-edit.component'
import { BookService } from '../_services/book.service';
import { Book } from '../_models';

import { TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { of, Observable } from 'rxjs';


describe('BookEditComponent test', () => {
  let bookComponent: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let dummyBook: Book;

  beforeEach(() => {
    dummyBook = dummyBook = { id: "1", title: "title", author: "auth", average_rating: 4, bookNum: 1, isbn: "123", isbn13: "1234", language_code: "eng", pages: 2, reviews_count: 1, ratings_count: 1 } as Book;
    const bookSpy = jasmine.createSpyObj('BookService', ['updateBook', 'getBook']);
    bookSpy.getBook.and.returnValue(of(dummyBook));
    bookSpy.updateBook.and.returnValue(of(dummyBook));

    TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: bookSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookEditComponent);
    bookComponent = fixture.componentInstance;
  });

  describe('should load form', () => {
    it('should load book add form', () => {
      fixture.detectChanges();
      expect(bookComponent).toBeTruthy();
    });

    it('should be an empty form', () => {
      let title = fixture.nativeElement.querySelector('input');
      expect(title.value).toBe('');
    });

    it('should load book date', () => {
      fixture.detectChanges();
      bookComponent.getBook(dummyBook.id);
      let title = fixture.nativeElement.querySelector('input');
      expect(title.value).toBe(dummyBook.title);
    });

    afterAll(() => {
      TestBed.resetTestingModule();
    });
  })
});
