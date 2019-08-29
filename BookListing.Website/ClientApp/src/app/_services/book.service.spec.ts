import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { Book } from '../_models';
import { BookService } from '../_services';

function getBaseUrl() {
  return 'baseurl/';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('Book Service Tests', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let bookService: BookService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService, BASE_URL]
    })

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    bookService = TestBed.get(BookService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe("should get Books", () => {
    let dummyBook: Book;

    beforeEach(() => {
      dummyBook = { id: "1", title: "title", author: "auth", average_rating: 4, bookNum: 1, isbn: "123", isbn13: "1234", language_code: "eng", pages: 2, reviews_count: 1, ratings_count: 1 } as Book;
      bookService = TestBed.get(BookService);
    });

    it('should return book', () => {
      bookService.getBook(dummyBook.id).subscribe(data => expect(data).toEqual(dummyBook, 'Should return expected book'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/Book/${dummyBook.id}`);
      expect(req.request.method).toEqual("GET")

      req.flush(dummyBook);
    });
  });

  describe("should update and add books", () => {
    let dummyBook: Book;

    beforeEach(() => {
      dummyBook = { id: "1", title: "title", author: "auth", average_rating: 4, bookNum: 1, isbn: "123", isbn13: "1234", language_code: "eng", pages: 2, reviews_count: 1, ratings_count: 1 } as Book;
    });

    it('should add book', () => {
      bookService.addBook(dummyBook).subscribe(book => expect(book).toEqual(dummyBook, 'should return added book'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/Book`);
      expect(req.request.method).toEqual("POST")

      req.flush(dummyBook);
    });

    it('should update book', () => {
      bookService.updateBook(dummyBook.id, dummyBook).subscribe(book => expect(book).toEqual(dummyBook, 'should return added book'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/Book`);
      expect(req.request.method).toEqual("PUT")

      req.flush(dummyBook);
    })
  })

});

