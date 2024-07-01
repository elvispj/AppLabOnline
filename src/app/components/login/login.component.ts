import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/entity/Credentials';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credentials={
    username:"",
    password:""
  };

  constructor(private loginService: LoginService,
    private router: Router){ }

  login(form: NgForm){
    this.loginService.login(this.creds).subscribe({
      next: response => {
        console.log("Esto regreso >>"+JSON.stringify(response));
        if(response.role==='USER' || response.role==='0' || response.perfilid===0){
          console.log("va amediadmin");
          this.router.navigate(['/medicaladmin']);
        }else{
          console.log("va dashboard");
          this.router.navigate(['/']);
        }
      },
      error: err =>{
        console.log("Error en login "+err),
        Swal.fire('Login failed',` El usuario o contraseña es incorrecto`, 'error')
      }
    })
  }
}
