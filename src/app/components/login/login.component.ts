import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/entity/Credentials';
import { Doctores } from 'src/app/entity/Doctores';
import { Usuarios } from 'src/app/entity/Usuarios';
import { DoctoresService } from 'src/app/services/doctores.service';
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
    private doctorService: DoctoresService,
    private router: Router){ }

  login(form: NgForm){
    this.loginService.login(this.creds).subscribe({
      next: usuario_resp => {
        if(usuario_resp){
          console.log("Esto regreso >>"+JSON.stringify(usuario_resp));
          switch(usuario_resp.perfilid){
            case 0: case 1:
              console.log("va dashboard");
              this.recuperaInfoColaborador(usuario_resp);
              this.router.navigate(['/']);
            break;
            case 2:
              console.log("va a medicaladmin");
              this.recuperaInfoDr(usuario_resp);
              this.router.navigate(['/medicaladmin']);
            break;
            default:
              Swal.fire('Login failed',`Vista no soportada`, 'error');
          }
        } else {
          Swal.fire('Login failed',`El usuario o contraseña es incorrecto.`, 'error');
        }
      },
      error: err =>{
        console.log("Error en login "+err),
        Swal.fire('Login failed',` El usuario o contraseña es incorrecto`, 'error')
      }
    })
  }

  recuperaInfoDr(usuario: Usuarios) {
    this.doctorService.getDoctorByUsuarioid(usuario.usuarioid).subscribe({
      next: doctorinfo=>{
        if(doctorinfo){
          sessionStorage.setItem("doctor_info", JSON.stringify(doctorinfo));
        } else {
          Swal.fire('Login failed',`No se logro recupera la informacion del dr`, 'error');
        }
      }
    });
  }
  
  recuperaInfoColaborador(response: any) {
    // throw new Error('Method not implemented.');
  }
}
