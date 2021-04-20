import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Token} from '../classes/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Base URL
  private  baseUrl = "http://localhost:5005/";



  constructor(private http: Http, private router : Router, private httpClient: HttpClient) { }

  saveAdminDetails(adminDetail : User) : Observable<any>
  {
      let url = this.baseUrl + "register";
      return this.http.post(url,adminDetail);
  }


  login(adminDetail : User) : Observable<any>
  {
      let url = this.baseUrl + "authenticate";
      return this.http.post(url, adminDetail);
  }

  logout()
  {
    // Remove the token from the localStorage.
    localStorage.removeItem('token');

    this.router.navigate(['']);


  }


  /*
	* Check whether User is loggedIn or not.
	*/

	isLoggedIn() {

		// create an instance of JwtHelper class.
    let jwtHelper = new JwtHelperService();

		// get the token from the localStorage as we have to work on this token.
		let token = localStorage.getItem('token');

		// check whether if token have something or it is null.
		if(!token)
		{
			return false;
		}

		// get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accept a string value which is nothing but token.

		if(token)
		{
			let expirationDate = jwtHelper.getTokenExpirationDate(token);

			// check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.

			let isExpired = jwtHelper.isTokenExpired(token);

			return !isExpired;
		}
  }


  getAdminDetail(adminId) : Observable<any>
  {
      let url = this.baseUrl + "users/" + adminId;

      // get token from localStorage.
      let token = localStorage.getItem('token');

    let headers = new Headers({
      'Authorization': `Bearer ${token}`
    })

      // Append Authorization header.
    headers.set("Authorization", 'Bearer ' + localStorage.getItem('token'));


      return this.http.get(url , { headers: headers });
  }

  verifyAccount (token : Token) : Observable<any>
  {
    let url = this.baseUrl + "verifyAccount";
    return this.http.post(url, token);
  }

}
