import { Component, Input, OnInit } from '@angular/core';
import { Doctores } from 'src/app/entity/Doctores';
import { Pacientes } from 'src/app/entity/Pacientes';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ma-altapaciente',
  templateUrl: './ma-altapaciente.component.html',
  styleUrls: ['./ma-altapaciente.component.css']
})
export class MaAltapacienteComponent implements OnInit {
  @Input() 
  doctor!: Doctores;
  @Input()
  paciente!:Pacientes;

  constructor(private pacienteService: PacientesService){}

  ngOnInit(): void {
    console.log("Recibido "+JSON.stringify(this.paciente));
  }

  altaPaciente(){
    let mensaje=this.paciente.pacienteid>0 
      ? {
        "titulo": "Actualizacion Paciente", 
        "exitoso":"Actualizacion de paciente exitosa", 
        "noexitoso":"No se logro actualizar la informacion del paciente", 
        "error": "Se genero un error al actualizar la informacion del paciente" 
        }
        : {
          "titulo": "Alta Paciente", 
          "exitoso":"Alta de paciente exitosa", 
          "noexitoso":"No se logro dar de alta al paciente", 
          "error": "Se genero un error al dar de alta al paciente" 
        }; 
    this.paciente.doctorid=this.doctor.doctorid;
    this.paciente.pacienteedad=this.calculaEdad(this.paciente.pacientefechanacimiento);
    console.log("Alta de paciente "+JSON.stringify(this.paciente));
    this.pacienteService.savePaciente(this.paciente).subscribe({
      next:resp=>{
        if(resp){
          Swal.fire(mensaje.titulo,mensaje.exitoso, 'success');
        }else{
          Swal.fire(mensaje.titulo,mensaje.noexitoso, 'warning');
        }
      },
      error: err=>{
        Swal.fire(mensaje.titulo,mensaje.exitoso, 'error');
      }
    });
  }

  calculaEdad(pacientefechanacimiento: Date): number {
    let timeDiff = Math.abs(Date.now() - new Date(pacientefechanacimiento).getTime());
    let edad:number=Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    return edad;
  }
}
