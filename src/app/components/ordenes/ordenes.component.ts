import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Estudios } from 'src/app/entity/Estudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';
import { TipoestudiosService } from 'src/app/services/tipoestudios.service';
import { Doctores } from 'src/app/entity/Doctores';
import { DoctoresService } from 'src/app/services/doctores.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  active = 1;
  ordenes: Ordenes = new Ordenes();
  estudios: Estudios[] = [];
  tiposestudios: Tipoestudios[] = [];
  listaDoctores: Doctores[] = [];
  listaFormasEntrega: string[]=["Impreso","Whatsapp","Correo"];
  listaComoUbico: string[]=["Solo","Clinica","Volantes","Facebook","Perifoneo"];
  listaOrigen: string[]=["Laboratorio","Clinica","Referido"];
  listaOrdenes: Ordenes[]=[];
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, 
    private ordenesService: OrdenesService, 
    private estudiosService: EstudiosService,
    private tipoestudiosService: TipoestudiosService,
    private doctoresService: DoctoresService){}


  ngOnInit(): void {
    this.doCargaOrdenes();

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      processing: true,
      lengthMenu: [5 ,10, 25],
      responsive: true
    };
    
    this.estudiosService.getAll().subscribe(
      res=>this.estudios=res
    );
    
    this.tipoestudiosService.getAll().subscribe(
      res=>this.tiposestudios=res
    );

    this.doctoresService.getAll().subscribe(
      res=>this.listaDoctores = res
    );
  }

  doCargaOrdenes(){
    this.ordenesService.getOrdenes().subscribe(
      (res) => this.listaOrdenes = res
    );
  }

  addEstudio(addEst:Estudios): void{
    console.log("Add>> "+addEst.estudioid);
    this.ordenes.estudios.push(addEst);
    console.log("\t**** Lista completa >> \n"+JSON.stringify(this.ordenes.estudios));
  }

  delEstudio(delEst: Estudios): void{
    console.log("Del>> "+delEst.estudioid);
    const index = this.ordenes.estudios.findIndex((sarchEstudio) => sarchEstudio.estudioid=delEst.estudioid);
    console.log("index >> "+index)
      delete this.ordenes.estudios[index];
      console.log("Estudio retirado");
    
    console.log("\t**** Lista completa >> \n"+JSON.stringify(this.ordenes.estudios));
  }
  
  onCategoriaPressed(newestudio: Estudios, isChecked: boolean) {
    if (isChecked) {
      this.ordenes.estudios.push(newestudio);
    } else {
      const index = this.ordenes.estudios.findIndex((estudio) => estudio.estudioid=newestudio.estudioid);
      delete this.ordenes.estudios[index];
    }
    console.log("Lista actual estudios:" + this.ordenes.estudios as string);
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
 