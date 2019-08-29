import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { UserService } from "./user.service";
import { User, Role } from "../_models";
import { Inject } from '@angular/core';
import { asyncData } from '../../testing/async-observable-helper';

let httpClientSpy: { get: jasmine.Spy };
let userService: UserService;

function getBaseUrl() {
  return 'baseurl';
}

const BASE_URL = [{ provide: 'BASE_URL', useFactory: getBaseUrl }]
const dummyUsers: User[] = [
  { id: '1', username: 'admin', password: 'admin', firstName: 'first', lastName: 'last', role: Role.Admin },
  { id: '2', username: 'user', password: 'user', firstName: 'user', lastName: 'user', role: Role.User }
];

beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  userService = new UserService(<any>httpClientSpy, getBaseUrl());
});

it('should be created', () => {
  expect(userService).toBeTruthy();
})

it('should return all users', () => {
  
  httpClientSpy.get.and.returnValue(asyncData(dummyUsers));

  userService.getAll().subscribe(res => expect(res).toEqual(dummyUsers, 'expected users'), fail);
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});
