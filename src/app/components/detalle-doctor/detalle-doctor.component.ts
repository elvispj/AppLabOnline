import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctores } from 'src/app/entity/Doctores';

@Component({
  selector: 'app-detalle-doctor',
  templateUrl: './detalle-doctor.component.html',
  styleUrls: ['./detalle-doctor.component.css']
})
export class DetalleDoctorComponent {
  @Input() doctor!: Doctores;
  @Output() updDoctorEmitter: EventEmitter<any> = new EventEmitter();
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();
  
  updateDoctor(){
    console.log("Se actualiza el doctor "+JSON.stringify(this.doctor));
    this.updDoctorEmitter.emit(this.doctor);
  }

  updEstatus(event:any){
    this.doctor.doctoractivo=event.target.checked;
    console.log("Estatus >> "+this.doctor.doctoractivo);
  }

  Cerrar(){
    this.closeEmitter.emit(true);
  }

}
