import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/entity/Credentials';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credentials={
    email:"",
    password:""
  };

  constructor(private loginService: LoginService,
    private router: Router){ }

  login(form: NgForm){
    console.log('Form >> '+form.value)

    this.loginService.login(this.creds).subscribe(
      response => {
        this.router.navigate(['/']);
      }
    )
  }
}
