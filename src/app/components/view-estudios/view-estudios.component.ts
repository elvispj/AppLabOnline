import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';
import { Ordendetalle } from 'src/app/entity/Ordendetalle';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';

@Component({
  selector: 'app-view-estudios',
  templateUrl: './view-estudios.component.html',
  styleUrls: ['./view-estudios.component.css']
})
export class ViewEstudiosComponent {
  @Input() tipoestudio!: Tipoestudios;
  @Input() listaEstudios!: Estudios[];
  @Output() addEstudiosEmitter: EventEmitter<any> = new EventEmitter();
  @Output() delEstudiosEmitter: EventEmitter<any> = new EventEmitter();

  changed(evt: any, estudio: Estudios) {
    let ordenesdetalle:Ordendetalle={
      ordendetalleid: -1,
      ordenid: -1,
      estudioid: estudio.estudioid,
      ordendetalleactivo: true,
      ordendetallecosto: estudio.estudiocosto,
      ordendetalledescuento: 0.0,
      ordendetallecostofinal: 0.0,
      ordendetallefechacreacion: new Date(),
      ordendetallefechamodificacion: new Date(),
      bitacoraid: -1,
    };
    if(evt.target.checked){
      console.log("Se agrega el id-"+ordenesdetalle.estudioid);
      this.addEstudiosEmitter.emit(ordenesdetalle);
    }else{
      console.log("Se retira el id-"+ordenesdetalle.estudioid);
      this.delEstudiosEmitter.emit(ordenesdetalle);
    }
  }
}
