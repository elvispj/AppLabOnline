import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePass, Credentials } from 'src/app/entity/Credentials';
import { Usuarios } from 'src/app/entity/Usuarios';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ma-perfil',
  templateUrl: './ma-perfil.component.html',
  styleUrls: ['./ma-perfil.component.css']
})
export class MaPerfilComponent implements OnInit {

  cambiarpassword:boolean=false;
  changePass: ChangePass={
    username: "",
    password: "",
    passwordnew: '',
    passwordnewconfirm: ''
  };

  constructor(private loginService: LoginService){ }

  ngOnInit(): void {

  }

  validPassword(pass:Event){
    let confirmPass=(pass.target as HTMLInputElement).value;
    console.log(">> "+confirmPass);
    if(this.changePass.passwordnew!=confirmPass){
      Swal.fire('Cambio Contraseña',`Las contraseñas no coinciden`, 'error');
      (pass.target as HTMLInputElement).value="";
      return;
    }
  }

  updatePassword(form: NgForm){
    let usuario:Usuarios=JSON.parse(sessionStorage.getItem("usuario")!);
    this.changePass.username=usuario.usuariocorreo;
    this.loginService.changePass(this.changePass).subscribe({
      next: response => {
        Swal.fire('Cambio Contraseña',`El cambio fue exitoso`, 'success');
        this.changePass={
          username: "",
          password: "",
          passwordnew: '',
          passwordnewconfirm: ''
        };
      },
      error: err =>{
        console.log("Error en login "+err),
        Swal.fire('Cambio Contraseña',`No se logro actualizar la contraseña`, 'error');
      }
    })
  }
}
