import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User, Role } from '../_models'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  public user: User
  id: string;
  userForm: FormGroup;
  firstName: string;
  lastName: number;
  userName: string;
  role: string;
  roleList: Array<Role> = [Role.Admin, Role.User]

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);
    this.userForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'role': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.userService.updateUser(this.id, form)
      .subscribe(result => {
        this.router.navigate(['/admin'])
      }, (err) => {
        console.log(err);
      })
  }

  getUser(id) {
    this.userService.getById(id)
      .subscribe(data => {
        this.user = data;
        this.id = id;
        this.userName = data.username;
        this.userForm.setValue({
          'firstName': data.firstName,
          'lastName': data.lastName,
          'role': data.role,
        });
      });
  }

}


