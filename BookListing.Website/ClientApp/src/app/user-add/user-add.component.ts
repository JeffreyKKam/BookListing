import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User, Role } from '../_models'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})
export class UserAddComponent {
  public user: User
  userForm: FormGroup;
  firstName: string;
  lastName: number;
  userName: string;
  role: string;
  password: string;
  roleList: Array<Role> = [Role.Admin, Role.User]
  error : string;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'userName': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'role': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.userService.addUser(form)
      .pipe(first())
      .subscribe(result => {
        let id = result['id'];
        this.router.navigate(['/admin'])
      }, (err) => {
          this.error = err;
          console.log(err);
      })
  }

}


