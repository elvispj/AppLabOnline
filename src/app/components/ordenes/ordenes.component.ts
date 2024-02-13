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
import Swal from 'sweetalert2';
import { Ordendetalle } from 'src/app/entity/Ordendetalle';

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
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.ordenesService.getOrdenes().subscribe(response => {
          this.listaOrdenes = response;
          let totalRecords = response.length;
          let filteredRecords = response.length;
          callback({
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: response
          });
        });
      },
      columns: [
        {title:"Id", data: 'ordenid'},
        {title:"Paciente", data: 'ordennombre'},
        {title:"Importe Final", data: 'ordenimportetotal'},
        {title:"Fecha", data: 'ordenfechacreacion'}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          //self.someClickHandler(data);
        });
        return row;
      }
    };
    
    this.estudiosService.getAll('').subscribe(
      res=>this.estudios=res
    );
    
    this.tipoestudiosService.getAll().subscribe(
      res=>this.tiposestudios=res
    );

    this.doctoresService.getAll().subscribe(
      res=>this.listaDoctores = res
    );
  }

  addEstudio(addOrdendetalle: Ordendetalle): void{
    this.ordenes.ordenesdetalle.push(addOrdendetalle);
  }

  delEstudio(delOrdentalle: Ordendetalle): void{
    const index = this.ordenes.ordenesdetalle.findIndex((sarchEstudio) => sarchEstudio.estudioid===delOrdentalle.estudioid);
    this.ordenes.ordenesdetalle.splice(index,1);
  }

  altaOrdenEstudio(){
    console.log("Llego >>"+JSON.stringify(this.ordenes));
    if(this.ordenes.ordenesdetalle==undefined || this.ordenes.ordenesdetalle==null || this.ordenes.ordenesdetalle.length<1){
      Swal.fire('Alta de Orden',`No se logro dar de alta la orden porque no se selecciono ningun estudio.`, 'error')
      return;
    }else{
      this.ordenesService.saveOrden(this.ordenes).subscribe(
        res => {
          console.log(res)
        },
        err => console.error(err)
      );
    }
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
 