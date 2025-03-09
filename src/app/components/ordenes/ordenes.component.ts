import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Subject, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Pagos } from 'src/app/entity/Pagos';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  ordenes: Ordenes = new Ordenes();
  ordenSeleccionada!: Ordenes;
  listaOrdenes: Ordenes[]=[];
  pago!:Pagos;

  vista:string='LISTA';

  private tooltipList = new Array<any>();

  constructor(private router: Router, 
    private ordenesService: OrdenesService, 
    private pagoService: PagosService){}


  ngOnInit(): void {
    this.doDataTable();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dt: DataTables.Api) => {
      // Destroy the table first
      dt.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  showDetalleOrden(orden:any){
    console.log("ordenid "+orden.ordenid);
    this.ordenesService.getOrden(orden.ordenid).subscribe(
      resp=>{
        console.log("muestra orden "+JSON.stringify(resp));
        this.ordenSeleccionada=resp;
        this.vista="SHOW_ORDEN";
    });
  }

  doDataTable() {
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      order: [
        [3, 'desc']
      ],
      ajax: (dataTablesParameters: any, callback) => {
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
        {title:"Costo", data: 'ordenimportetotal'},
        {title:"Fecha", data: 'ordenfechacreacion'},
        {title:"Acciones",
          render:(data,type,row)=>{
            return `<button class='btn btn-primary m-3 text-white bt-show'><i class="fa-regular fa-eye"></i></button>`
            +`<button class='btn btn-success m-3 text-white bt-res'><i class="fa-regular fa-clipboard"></i></button>`
            +`<button class='btn btn-danger m-3 text-white bt-del'><i class="fa-regular fa-trash-can"></i></button>`;
          }
        }
      ],
      drawCallback:() =>{
        $('.bt-show').on('click', (event: any) => {
          const rowData = $('#table_ordenes').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showDetalleOrden(rowData);
        });
        $('.bt-res').on('click', (event: any) => {
          const rowData = $('#table_ordenes').DataTable().row($(event.currentTarget).parents('tr')).data();
          alert("Resultados");
        });
        $('.bt-del').on('click', (event: any) => {
          const rowData = $('#table_ordenes').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.deleteOrden(rowData);
        });
      },
      "language": {
        search: 'Buscar Orden',
        "zeroRecords": "Sin registros",
        "info": "P&aacute;gina _PAGE_ de _PAGES_",
        "infoEmpty": "No existen registrtos en base de datos",
        "infoFiltered": "(filtrado de un total de _MAX_)",
        "paginate": {
          "previous": "Anterior",
          "next": "Siguiente",
          "last": "&Uacute;ltima p&aacute;gina",
          "first": "Primera p&aacute;gina"
        }
      }
    };
  }

  deleteOrden(orden: any) {
    Swal.fire({
      title: "Desea cancelar la orden?",
      text: "Presione confirmar para cancelar la orden, si no precione descartar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Descartar"
    }).then((result) => {
      this.pago=new Pagos();
      if (result.isConfirmed) {
        this.pagoService.getPagoByOrdenId(orden.ordenid).subscribe({
          next: resp=>{
            if(resp){
              this.pago=resp;
            }
          },
          error: err=>{
            Swal.fire({
              title: "Error",
              text: "Se genero un error al consultar el pago",
              icon: "error"
            });
          }
        });
        console.log("Inicia cancelacion");
        setTimeout(() => {
          console.log("Inicia timeout");
          // console.log(JSON.stringify(this.pago));
          // if(this.pago.pagoid>0) console.log("primera");
          // if(this.pago.pagoestatusid!="NVO") console.log("NVO");
          // if(this.pago.pagoestatusid!="CAN") console.log("CAN");
          if(this.pago.pagoid>0 && this.pago.pagoestatusid!="NVO" && this.pago.pagoestatusid!="CAN"){
            Swal.fire({
              title: "Error",
              text: "La orden ya cuenta con un pago iniciado ID-"+this.pago.pagoid,
              icon: "error"
            });
            return;
          }
          orden.ordenactiva=false;
          this.ordenesService.saveOrden(orden).subscribe({
            next: resp=>{
              if(resp){
                Swal.fire({
                  title: "Eliminado",
                  text: "La orden fue cancelada",
                  icon: "success"
                });
              }else{
                Swal.fire({
                  title: "Error",
                  text: "No fue posible cancelar la orden",
                  icon: "error"
                });
              }
              window.location.reload();
            },
            error: err=>{
              Swal.fire({
                title: "Error",
                text: "Se genero un error al procesar la cancelacion",
                icon: "error"
              });
            }
          });
        }, 750);
        console.log("termino timeout");
      }
    });
  }

  showView(vista:any){
    this.vista=vista;
    this.ordenSeleccionada=new Ordenes();
  }

  showViewDet(view:any){
    console.log("Recibio "+JSON.stringify(view));
    if(view.ordenid>0){
      this.ordenesService.getOrden(view.ordenid).subscribe(
        resp=>{
          this.ordenSeleccionada=resp;
          console.log("Mostrara "+JSON.stringify(this.ordenSeleccionada));
          this.vista=view.vista;
        }
      );
    }else{
      this.vista=view.vista;
    }
  }
}
 