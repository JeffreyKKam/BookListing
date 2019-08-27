import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAll() {
    return this.http.get<User[]>(`${this.baseUrl}api/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.baseUrl}api/users/${id}`);
  }

  addUser(user) {
    return this.http.post<User>(`${this.baseUrl}api/users`, user, { headers });
  }

  updateUser(id, user) {
    user.id = id;
    return this.http.put<User>(`${this.baseUrl}api/users`, user, { headers });
  }

  updatePassword(id, password) {
    return this.http.put<any>(`${this.baseUrl}api/users/password`, null,
      { headers, params: { id: id, password: password } });
  }

  deleteUser(id) {
    return this.http.delete<any>(`${this.baseUrl}api/users/${id}`, { headers })
  }

}
