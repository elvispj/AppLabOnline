import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudios } from 'src/app/entity/Estudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  estudioSeleccionado!: Estudios;

  constructor(private router: Router, 
    private activateRoute: ActivatedRoute, 
    private estudiosService: EstudiosService,
    private http: HttpClient
    ){}
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.estudiosService.getAll(dataTablesParameters).subscribe(response => {
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
        {title:"Id", data: 'estudioid'},
        {title:"Nombre", data: 'estudionombre'},
        {title:"Identificador", data: 'estudionombrecorto'},
        {title:"Costo", data: 'estudiocosto'},
        {title:"Fecha", data: 'estudiofechamodificacion'}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.showDetalleEstudio(data);
        });
        return row;
      }
    };
  }

  showDetalleEstudio(estudio: any): void {
    this.estudioSeleccionado = estudio;
  }

  updateEstudio(estudio: Estudios){
    this.estudiosService.save(estudio).subscribe(
      {
        next: res => {
          estudio = res;
          Swal.fire('Actualizar Estudio',`Se actualizo el estudio de forma automatica`, 'success');
          this.estudioSeleccionado=new Estudios();
        },
        error: err => {
          console.log("Error >> "+err);
          Swal.fire('Actualizar Estudio',`No se logro actualizar el estudio`, 'error');
        }
      });
  }

  closeDetalle():void{
    this.estudioSeleccionado = new Estudios();
  }
}

/*
this.http.post<any[]>(Constantes.URL_API()+'/estudios/all', JSON.stringify(dataTablesParameters))
  .subscribe(response => {
    console.log(" respuesta "+JSON.stringify(response));
    let totalRecords = response.length;
    let filteredRecords = response.length;
    callback({
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: response
    });
});*/