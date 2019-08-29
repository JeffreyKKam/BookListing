import { TestBed, ComponentFixture } from '@angular/core/testing';

import { User, Role } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';

function getBaseUrl() {
  return 'baseurl';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('Admin Component', () => {
  let adminComponent: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let dummyUsers: User[];


  beforeEach(() => {
    dummyUsers = [
      { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin },
      { id: '2', username: 'user', password: 'user', firstName: 'user', lastName: 'user', role: Role.User }
    ] as User[];
    const userSpy = jasmine.createSpyObj('UserService', ['getAll', 'deleteUser']);

    userSpy.getAll.and.returnValue(of(dummyUsers));
    userSpy.deleteUser.and.returnValue();
    class MockAuthService {
      public currentUser: Observable<User> = of(dummyUsers[0]);
    }

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useValue: userSpy },
        { provide: AuthenticationService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    adminComponent = fixture.componentInstance;
  });

  describe('should load users', () => {
    it('should have users', () => {
      fixture.detectChanges();
      expect(adminComponent.users).toEqual(dummyUsers, "should equal user list");
      expect(adminComponent.currentUser).toBe(dummyUsers[0]);
    });
  });
  

});

