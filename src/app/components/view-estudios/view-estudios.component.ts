import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';
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
    if(evt.target.checked){
      console.log("Se agrega el id-"+estudio.estudioid);
      this.addEstudiosEmitter.emit(estudio);
    }else{
      console.log("Se retira el id-"+estudio.estudioid);
      this.delEstudiosEmitter.emit(estudio);
    }
   /* 
   const index = this.listaEstudios.findIndex((estudio) => estudio.estudioid=estudioid);
    console.log("El index es >> "+index+" del total de la lista "+this.listaEstudios.length);
    let newE:Estudios=this.listaEstudios[index];
    
    if(evt.target.checked){
      this.listEst.push(this.listaEstudios[index]);
      alert('Agregado');
    }else{
      delete this.listEst[index];
      alert('Eliminardo ');
    }*/
//    this.estudiosEmitter.emit(this.listEst);
  }
}
