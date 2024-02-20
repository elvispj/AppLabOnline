import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Estudios } from 'src/app/entity/Estudios';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import { TipoestudiosService } from 'src/app/services/tipoestudios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  estudio: Estudios=new Estudios();
  estudioSeleccionado!: Estudios;
  listaTipoEstudios: Tipoestudios[]=[];

  constructor(private router: Router, 
    private activateRoute: ActivatedRoute, 
    private estudiosService: EstudiosService,
    private tipoestudiosService: TipoestudiosService,
    private http: HttpClient
    ){}
  
  ngOnInit(): void {
    this.tipoestudiosService.getAll().subscribe({
      next: lista => {
        this.listaTipoEstudios = lista;
      },
      error: err=> {
        console.log("Error >> "+err);
        Swal.fire('Tipos Estudio','No se logro recuperar la lista de tipos de estudio', 'error');
      }
    });

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
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

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  showDetalleEstudio(estudio: any): void {
    this.estudioSeleccionado = estudio;
  }

  crearEstudio():void{
    console.log("Se agrega "+JSON.stringify(this.estudio));
    this.estudiosService.save(this.estudio).subscribe({
      next: response=>{
        Swal.fire('Alta Estudio','Se agrego el nuevo estudio de forma exitosa', 'success');
        this.rerender();
      },
      error: err=>{
        console.log("Error >> "+err);
        Swal.fire('Alta Estudio','No se logro dar de alta el nuevo estudio', 'error');
      }
    })
  }

  updateEstudio(estudio: Estudios){
    this.estudiosService.save(estudio).subscribe(
      {
        next: res => {
          estudio = res;
          Swal.fire('Actualizar Estudio',`Se actualizo el estudio de forma automatica`, 'success');
          this.estudioSeleccionado=new Estudios();
          this.rerender();
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