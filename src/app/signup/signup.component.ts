import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private adminDetail = new User();

  constructor(private adminService : UserService, private router : Router) { }

  ngOnInit() {
  }

  // create the form object.
  form = new FormGroup({
      fullName : new FormControl('' , Validators.required),
      email : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required),
      confirmPassword : new FormControl('' , Validators.required),
      role : new FormControl('' , Validators.required),
  });

  AdminForm(AdminInformation)
  {
     let pass = this.Password.value;
     let confirmPass = this.ConfirmPassword.value;

     if(pass == confirmPass)
     {
        this.adminDetail.name = this.FullName.value;
        this.adminDetail.email = this.Email.value;
        this.adminDetail.password = this.Password.value;
        this.adminDetail.role = this.Role.value;

        this.adminService.saveAdminDetails(this.adminDetail).subscribe(
          response => {
              let result = response.json();

              if(result > 0)
              {
                this.router.navigate(['/register']);
              }
              else
              {
                  alert("error occur while registring User. please try after sometime.")
              }
          },
          error => {
            alert("error occur while registring User. please try after sometime.")
          }
        );

     }
     else
     {
        alert("Password and confirm password not match.");
     }
  }


  get FullName(){
    return this.form.get('fullName');
  }

  get Email(){
      return this.form.get('email');
  }

  get Password(){
      return this.form.get('password');
  }

  get ConfirmPassword(){
      return this.form.get('confirmPassword');
  }

  get Role(){
      return this.form.get('role');
  }



}
