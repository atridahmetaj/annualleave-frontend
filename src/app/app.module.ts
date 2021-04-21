import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule} from '@angular/http';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { VerifyComponent } from './verify/verify.component';
import { VacationsComponent } from './vacations/vacations.component';
import {AuthInterceptor} from './services/interceptor';
import { AddApplicationComponent } from './add-application/add-application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    VerifyComponent,
    VacationsComponent,
    AddApplicationComponent,
    ApplicationListComponent,
    ApplicationDetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'signup',
        component : SignupComponent
      },
      {
        path : 'verifyAccount',
        component : VerifyComponent
      },
      {
        path : 'profile/:id',
        component : ProfileComponent
      },
      {
        path : 'profile/:id/applications',
        component : ApplicationListComponent
      },
      {
        path : 'profile/:id/application',
        component : AddApplicationComponent
      },
      {
        path: 'applications/:id',
        component: ApplicationDetailComponent
      },
      {
        path : 'resetPassword',
        component : UserProfileComponent
      }


    ])

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
