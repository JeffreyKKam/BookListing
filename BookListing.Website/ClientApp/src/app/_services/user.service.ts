import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}api/users`);
    }

    getById(id: number) {
      return this.http.get<User>(`${this.baseUrl}api/users/${id}`);
    }
}
