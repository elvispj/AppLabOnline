import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Doctorcitas } from 'src/app/entity/Doctorcitas';
import { Doctores } from 'src/app/entity/Doctores';
import { Pacientes } from 'src/app/entity/Pacientes';
import { DoctorcitasService } from 'src/app/services/doctorcitas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ma-agregar-cita',
  templateUrl: './ma-agregar-cita.component.html',
  styleUrls: ['./ma-agregar-cita.component.css']
})
export class MaAgregarCitaComponent implements OnInit {

  @Input() doctor!: Doctores;
  @Input() listPacientes!: Pacientes[];
  @Output() addCitaEmitter: EventEmitter<any> = new EventEmitter();
  @Output() closeCardEmitter: EventEmitter<any> = new EventEmitter();

  citaNueva:Doctorcitas=new Doctorcitas();

  selectPacientes!: Pacientes[];
  pacientenombre:string='Seleccionar Paciente';
  
  AddCitaForm:FormGroup = new FormGroup({
    fecha: new FormControl(''),
    hora: new FormControl(''),
    asunto: new FormControl(''),
    comentarios: new FormControl('')
  });

  constructor(private doctorCitasService:DoctorcitasService,
    private elementRef: ElementRef
  ){}

  ngOnInit(): void {
    this.selectPacientes=this.listPacientes;
  }

  selectPaciente(paciente:any){
    this.pacientenombre=paciente.pacientenombre+" "+paciente.pacienteapellidopaterno+" "+paciente.pacienteapellidomaterno;
    this.citaNueva.pacienteid=paciente.pacienteid;
    this.citaNueva.citanombre=paciente.pacientenombre+" "+paciente.pacienteapellidopaterno+" "+paciente.pacienteapellidomaterno;
    this.selectPacientes=this.listPacientes;
    let in_search = this.elementRef.nativeElement.querySelector("#in_search").value="";
  }

  buscar(cadena:any){
    if(cadena.target.value!=undefined && cadena.target.value!=null){
      this.selectPacientes = this.listPacientes.filter((paciente) => 
        (paciente.pacientenombre+" "+paciente.pacienteapellidopaterno+" "+paciente.pacienteapellidomaterno)
        .toUpperCase().indexOf(cadena.target.value.toUpperCase())>=0
      );
    }else{
      this.selectPacientes=this.listPacientes;
    }
  }

  addCita(){
    this.citaNueva.doctorid=this.doctor.doctorid;
    this.citaNueva.citaestatusid='NVO';
    this.citaNueva.citalugar='CONSULTORIO';
    console.log("Agregara "+JSON.stringify(this.citaNueva));
    this.doctorCitasService.saveCita(this.citaNueva).subscribe({
      next: resp=>{
        if(resp){
          Swal.fire('Alta Citas',`Se guardo de forma exitosa la cita`, 'success');
          this.addCitaEmitter.emit(resp);
        }else{
          Swal.fire('Alta Citas',`No se logro dar de alta la nueva cita`, 'info');
        }
      },
      error: err=>{
        Swal.fire('Alta Citas',`Se genero un error registrar la nueva cita`, 'error');
      }
    });
  }

  closeCard(){
    this.closeCardEmitter.emit("close");
  }
}
