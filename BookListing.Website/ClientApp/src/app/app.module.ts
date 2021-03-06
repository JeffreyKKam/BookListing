import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserPasswordComponent } from './user-password/user-password.component';

import { Role } from './_models';
import { JwtInterceptor, ErrorInterceptor, AuthGuard } from './_helpers';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BookListComponent,
    BookAddComponent,
    BookDetailComponent,
    BookEditComponent,
    LoginComponent,
    AdminComponent,
    UserAddComponent,
    UserEditComponent,
    UserPasswordComponent,    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: BookListComponent, pathMatch: 'full', canActivate: [AuthGuard] }, 
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }  },
      { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },   
      { path: 'book/:id', component: BookDetailComponent, canActivate: [AuthGuard] },
      { path: 'book-add', component: BookAddComponent, canActivate: [AuthGuard] },
      { path: 'book-edit/:id', component: BookEditComponent, canActivate: [AuthGuard] },
      { path: 'user-add', component: UserAddComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'user-password/:id', component: UserPasswordComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }

    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
