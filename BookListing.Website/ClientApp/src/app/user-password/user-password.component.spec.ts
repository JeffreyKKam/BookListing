import { TestBed, ComponentFixture } from '@angular/core/testing';

import { User, Role } from '../_models';
import { UserService } from '../_services';
import { UserPasswordComponent } from './user-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';

function getBaseUrl() {
  return 'baseurl';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('User Password Component Test', () => {
  let userComponent: UserPasswordComponent;
  let fixture: ComponentFixture<UserPasswordComponent>;
  let dummyUser: User;


  beforeEach(() => {
    dummyUser = { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin } as User;
    const userSpy = jasmine.createSpyObj('UserService', ['updatePassword']);
    userSpy.updatePassword.and.returnValue(of(dummyUser));

    TestBed.configureTestingModule({
      declarations: [UserPasswordComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPasswordComponent);
    userComponent = fixture.componentInstance;
  });

  describe('should load password form', () => {
    it('should load', () => {
      fixture.detectChanges();
      expect(userComponent).toBeTruthy();
      let passowrd = fixture.nativeElement.querySelector('input');
      expect(passowrd.value).toBe('');
    });
  });
  
});

