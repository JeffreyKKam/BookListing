import { TestBed, ComponentFixture } from '@angular/core/testing';

import { User, Role } from '../_models';
import { UserService } from '../_services';
import { UserEditComponent } from './user-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';

function getBaseUrl() {
  return 'baseurl';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('User Edit Component Test', () => {
  let userComponent: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let dummyUser: User;


  beforeEach(() => {
    dummyUser = { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin } as User;
    const userSpy = jasmine.createSpyObj('UserService', ['updateUser', 'getById']);
    userSpy.updateUser.and.returnValue(of(dummyUser));
    userSpy.getById.and.returnValue(of(dummyUser));

    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    userComponent = fixture.componentInstance;
  });

  describe('should load edit form', () => {
    it('should load edit form', () => {
      fixture.detectChanges();
      expect(userComponent).toBeTruthy();
    });

    it('should be an empty form', () => {
      let firstValue = fixture.nativeElement.querySelector('input');
      expect(firstValue.value).toBe('');
    });

    it('should load user data in form', () => {
      fixture.detectChanges();
      userComponent.getUser(dummyUser.id);
      let firstname = fixture.nativeElement.querySelector('input');
      let h1 = fixture.nativeElement.querySelector('h1');
      expect(firstname.value).toBe(dummyUser.firstName);
      expect(h1.textContent).toContain(dummyUser.username);      
    })

    afterAll(() => {
      TestBed.resetTestingModule();
    });
  });
  
});

