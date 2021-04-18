import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Token} from '../classes/token';
import {UserService} from '../services/user.service';
import {User} from '../classes/user';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  // Base URL
  private  baseUrl = "http://localhost:5005/";

  private token = new Token();

  private user: User;

  constructor(private route: ActivatedRoute,private userService: UserService, private router : Router) {
    this.route.queryParams.subscribe(params => {
      this.token.token = params['token'];
    });
  }


  ngOnInit() {
    this.userService.verifyAccount(this.token).subscribe((data)=>{
      console.log(data);
      this.user = data['user'];
    });
  }

}
