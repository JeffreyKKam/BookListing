import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../_models'

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html'
})
export class UserPasswordComponent implements OnInit {
  public user: User
  id: string;
  userForm: FormGroup;
  password: string;
  userName: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userForm = this.formBuilder.group({
      'password': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.userService.updatePassword(this.id, form)
      .subscribe(result => {
        this.router.navigate(['/admin'])
      }, (err) => {
        console.log(err);
      })
  }

}


