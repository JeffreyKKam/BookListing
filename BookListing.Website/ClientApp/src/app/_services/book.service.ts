import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolrResponse, Book } from '../_models';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({ providedIn: 'root' })
export class BookService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    search(searchTerm, page) {
        var solrPage = page - 1;
        return this.http.get<SolrResponse>(`${this.baseUrl}api/Book/Search`, {
            headers, params: { searchTerm: searchTerm, page: solrPage.toString() }
        });
    }

    getBook(id: string) {
        return this.http.get<Book>(`${this.baseUrl}api/Book/${id}`);
    }

    addBook(book) {
        return this.http.post<Book>(`${this.baseUrl}api/Book`, book, { headers })
    }

    updateBook(id, book) {
        book.id = id;
        return this.http.put<Book>(`${this.baseUrl}api/Book`, book, { headers })
    }

    deleteBook(id){
        return this.http.delete<any>(`${this.baseUrl}api/Book/${id}`, { headers })
    }
} 
