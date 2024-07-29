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
  @Input() doctor!: Doctores;
  paciente:Pacientes=new Pacientes();

  constructor(private pacienteService: PacientesService){}

  ngOnInit(): void {
  }

  altaPaciente(){
    this.paciente.doctorid=this.doctor.doctorid;
    this.paciente.pacienteedad=this.calculaEdad(this.paciente.pacientefechanacimiento);
    console.log("Alta de paciente "+JSON.stringify(this.paciente));
    this.pacienteService.savePaciente(this.paciente).subscribe({
      next:resp=>{
        if(resp){
          Swal.fire('Alta Paciente',`Alta de paciente exitosa`, 'success');
        }else{
          Swal.fire('Alta Paciente',`No se logro dar de alta al paciente`, 'error');
        }
      },
      error: err=>{
        Swal.fire('Alta Paciente',`Se genero un error al dar de alta al paciente`, 'error');
      }
    });
  }

  calculaEdad(pacientefechanacimiento: Date): number {
    let timeDiff = Math.abs(Date.now() - new Date(pacientefechanacimiento).getTime());
    let edad:number=Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    return edad;
  }
}
