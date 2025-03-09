import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Inventario, InventarioTipoProducto } from 'src/app/entity/Inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listaInventarioTipoProducto: InventarioTipoProducto[]=[];
  listaInventario: Inventario[]=[];
  inventario!: Inventario;
  imageSrc!: any;

  fileSelected!:any;

  formatter = new Intl.NumberFormat('es-MX');
  datepipe: DatePipe = new DatePipe('es-MX');

  @ViewChild('modalEditar', { static: true }) 
  modalEditar!: TemplateRef<any>;

  constructor(private modal: NgbModal,
    private inventarioService: InventarioService){}

  ngOnInit(): void {
    /*this.inventarioService.getAllTipoProducto('').subscribe({
      next: lista => {
        this.listaInventarioTipoProducto=lista;
        this.rerender();
      },
      error: err=>{
        console.log("Error >> "+err);
        Swal.fire('Inventario','No se logro recuperar la informacion', 'error');
      }
    });*/
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  showEditarInventario(inventario:any){
    console.log("Seleccionado >> "+JSON.stringify(inventario));
    this.inventario=inventario;
    this.modal.open(this.modalEditar);
  }

  readURL(event: any): void {
    this.fileSelected = event.target.files[0];
    if (this.fileSelected) {
      this.inventario.inventarioimagen=this.fileSelected.name;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.fileSelected);
    }
  }

  guardarCambios():void{
    if (this.fileSelected) {
      console.log("adjunta archivo "+JSON.stringify(this.inventario));
      const formData = new FormData();
      formData.append('inventarioimagen', this.fileSelected);
      formData.append("inventario",JSON.stringify(this.inventario));
      this.inventarioService.saveWithImage(formData).subscribe({
        next: resp=>{
          if(resp){
            if(resp){
              Swal.fire('Inventario','Actualizacion exitosa', 'success');
            }
          }else{
            Swal.fire('Inventario','No se logro actualizar la informacion del inventario', 'warning');
          }
        },
        error:err=>{
          Swal.fire('Inventario','Se genero un error al actualizar el inventario', 'error');
        }
      });
      this.fileSelected=null;
    } else {
      console.log("Se guardara "+JSON.stringify(this.inventario));
      this.inventarioService.save(this.inventario).subscribe({
        next: resp=>{
          if(resp){
            if(resp){
              Swal.fire('Inventario','Actualizacion exitosa', 'success');
            }
          }else{
            Swal.fire('Inventario','No se logro actualizar la informacion del inventario', 'warning');
          }
        },
        error:err=>{
          Swal.fire('Inventario','Se genero un error al actualizar el inventario', 'error');
        }
      });
    }
  }

  doDataTable(){
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.inventarioService.getAllTipoProducto(dataTablesParameters).subscribe(response => {
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
        {title:"Id", data: 'inventarioid'},
        {title:"Proveedor", data: 'proveedornombre'},
        {title:"Tipo Producto", data: 'tipoproductonombre'},
        {title:"Unidad", data: 'inventariounidad'},
        {title:"Cantidad", data: 'inventariocantidadoriginal'},
        {title:"Restante", data: 'inventariocantidadactual'},
        {title:"Caducidad", data: 'inventariofechacaducidad'},
        {title:"Fecha", 
          render:(data,type,row)=>{
            return this.datepipe.transform(new Date(row.inventariofechamodificacion), 'yyyy-MM-dd');
          }
        },
        {title: " - - -", 
          render:(data,type,row)=>{
            return '<button type="button" class="btn btn-outline-success m-1 bt-e"><i class="fa-regular fa-pen-to-square"></i></button>'
          }, "className": "dt-center"
        }
      ],
      columnDefs: [
      {
        targets:[0],
        visible: false,
        searchable: false
      }
      ],
      drawCallback:() =>{
        $('.bt-e').on('click', (event:any) => {
          const inventario = $('#table_inventario').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showEditarInventario(inventario);
        });
      }
    };
  }
}
