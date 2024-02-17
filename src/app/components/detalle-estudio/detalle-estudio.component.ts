import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';

@Component({
  selector: 'app-detalle-estudio',
  templateUrl: './detalle-estudio.component.html',
  styleUrls: ['./detalle-estudio.component.css']
})
export class DetalleEstudioComponent {
  @Input() estudio!: Estudios;
  @Output() updEstudiosEmitter: EventEmitter<any> = new EventEmitter();
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();
  
  updateEstudio(){
    console.log("Se actualiza el estudio "+JSON.stringify(this.estudio));
    this.updEstudiosEmitter.emit(this.estudio);
  }

  updEstatus(event:any){
    this.estudio.estudioactivo=event.target.checked;
    console.log("Estatus >> "+this.estudio.estudioactivo);
  }

  Cerrar(){
    this.closeEmitter.emit(true);
  }
}
