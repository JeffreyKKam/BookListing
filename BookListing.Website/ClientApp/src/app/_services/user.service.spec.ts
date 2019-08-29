import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { User, Role } from '../_models';
import { UserService } from '../_services';

function getBaseUrl() {
  return 'baseurl/';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]

describe('User Service Tests', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, BASE_URL]
    })

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe("should get users", () => {
    let dummyUsers: User[];

    beforeEach(() => {
      dummyUsers = [
        { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin },
        { id: '2', username: 'user', password: 'user', firstName: 'user', lastName: 'user', role: Role.User }
      ] as User[];
      userService = TestBed.get(UserService);
    });

    it('should return expected users', () => {
      userService.getAll().subscribe(users => expect(users).toEqual(dummyUsers, 'should return expected users'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/users`);
      expect(req.request.method).toEqual("GET")

      req.flush(dummyUsers);
    });

    it('should return user', () => {
      let user = dummyUsers[0];
      userService.getById(user.id).subscribe(data => expect(data).toEqual(user, 'Should return expected user'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/users/${user.id}`);
      expect(req.request.method).toEqual("GET")

      req.flush(user);
    });
  });

  describe("should update and add users", () => {
    let testUser: User;

    beforeEach(() => {
      testUser = { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin } as User;
    })

    it('should add user', () => {
      userService.addUser(testUser).subscribe(user => expect(user).toEqual(testUser, 'should return added user'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/users`);
      expect(req.request.method).toEqual("POST")

      req.flush(testUser);
    });

    it('should update user', () => {
      userService.updateUser(testUser.id, testUser).subscribe(user => expect(user).toEqual(testUser, 'should return added user'), fail);

      const req = httpTestingController.expectOne(`${getBaseUrl()}api/users`);
      expect(req.request.method).toEqual("PUT")

      req.flush(testUser);
    })
  })

});

