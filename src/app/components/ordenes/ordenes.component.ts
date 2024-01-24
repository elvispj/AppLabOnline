import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { createNgModule } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';
import { TipoestudiosService } from 'src/app/services/tipoestudios.service';
import { Doctores } from 'src/app/entity/Doctores';
import { DoctoresService } from 'src/app/services/doctores.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: Ordenes = new Ordenes();
  estudios: Estudios[] = [];
  tiposestudios: Tipoestudios[] = [];
  listaDoctores: Doctores[] = [];
  listaFormasEntrega: string[]=["Impreso","Whatsapp","Correo"];
  listaComoUbico: string[]=["Solo","Clinica","Volantes","Facebook","Perifoneo"];
  listaOrigen: string[]=["Laboratorio","Clinica","Referido"];

  constructor(private router: Router, 
    private ordenesService: OrdenesService, 
    private estudiosService: EstudiosService,
    private tipoestudiosService: TipoestudiosService,
    private doctoresService: DoctoresService){}

  ngOnInit(): void {
    this.estudiosService.getAll().subscribe(
      res=>{
        this.estudios=res,
        console.log("Tamanio de la lista "+this.estudios.length),
        console.log("Tamanio de la lista "+res.length)
      }
    )
    console.log("Ya solicito lista de estudios "+this.estudios.length);
    
    this.tipoestudiosService.getAll().subscribe(
      res=>this.tiposestudios=res
    )
    console.log("Ya solicito lista de tiposestudios "+this.tiposestudios.length);

    this.doctoresService.getAll().subscribe(
      res=>this.listaDoctores = res
    );
    console.log("Ya solicito lista de doctores "+this.listaDoctores.length);
  }

  altaOrdenEstudio(){
    console.log("Llego >>"+this.ordenes.ordennombre);
    this.ordenesService.saveOrden(this.ordenes).subscribe(
      res => {
        console.log(res)
      },
      err => console.error(err)
    )
  }

  procesarListaEstudios(lista:Estudios[]){
    console.log("Procesa la lista de alumnos "+lista.length);
    this.estudios=lista;
    for(let i=0; i<this.estudios.length; i++){
      if(this.estudios[i].tipoestudioid>0){
        let tipoestudio: Tipoestudios = new Tipoestudios(this.estudios[i].tipoestudioid, 
          true, '', '', null, null, -1);
        this.addListTipoEstudio(tipoestudio);
      }
    }
  }

  addListTipoEstudio(tipoestudio:Tipoestudios){
    for(let i=0; i<this.tiposestudios.length; i++){
      if(this.tiposestudios[i].tipoestudioid==tipoestudio.tipoestudioid){
        return false;
      }
    }
    this.tiposestudios.push(tipoestudio);
    return true;
  }
}
 