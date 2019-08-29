import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {
  public users: User[] = [];
  public currentUser: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(r => { this.getUsers() })
  }
}
