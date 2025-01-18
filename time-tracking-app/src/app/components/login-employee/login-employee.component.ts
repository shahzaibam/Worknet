import { Component } from '@angular/core';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css']
})
export class LoginEmployeeComponent {

  email?:string;
  password?:string;

  constructor() {
  }


  onSubmit() {
    console.log(this.email)
    console.log(this.password)
  }

}
