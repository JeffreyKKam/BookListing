import { TestBed, ComponentFixture } from '@angular/core/testing';

import { User, Role } from '../_models';
import { UserService } from '../_services';
import { UserAddComponent } from './user-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';

function getBaseUrl() {
  return 'baseurl';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('User Add Component Test', () => {
  let userComponent: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;
  let dummyUser: User;


  beforeEach(() => {
    dummyUser = { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin } as User;
    const userSpy = jasmine.createSpyObj('UserService', ['addUser']);
    userSpy.addUser.and.returnValue(of(dummyUser));

    TestBed.configureTestingModule({
      declarations: [UserAddComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddComponent);
    userComponent = fixture.componentInstance;
  });

  describe('should load form', () => {
    it('should load form', () => {    

      fixture.detectChanges();
      expect(userComponent).toBeTruthy();
    });
  });
  

});

