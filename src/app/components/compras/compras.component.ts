import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Compras } from 'src/app/entity/Compras';
import { Inventario } from 'src/app/entity/Inventario';
import { Proveedores } from 'src/app/entity/Proveedores';
import { Tipoproducto } from 'src/app/entity/Tipoproducto';
import { ComprasService } from 'src/app/services/compras.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { TipoproductosService } from 'src/app/services/tipoproductos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listaCompras: Compras[]=[];
  listaProductos: Tipoproducto[]=[];
  listaProveedores: Proveedores[]=[];
  listaInventario: Inventario[]=[];
  showAgregarCompra: boolean = false;
  inventario: Inventario=new Inventario();
  datePipe = new DatePipe('es-MX');

  constructor(private comprasService: ComprasService,
    private tipoproductoService: TipoproductosService,
    private proveedoresService: ProveedoresService){}

  ngOnInit(): void {
    this.tipoproductoService.getAll('').subscribe({
      next: lista => {
        this.listaProductos=lista;
      },
      error: err=>{
        console.log("Error >> "+err);
        Swal.fire('Tipo Productos','No se logro recuperar la informacion', 'error');
      }
    });

    this.proveedoresService.getAll().subscribe({
      next: lista => {
        this.listaProveedores=lista;
      },
      error: err=>{
        console.log("Error >> "+err);
        Swal.fire('Proveedores','No se logro recuperar la informacion', 'error');
      }
    });

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.comprasService.allCompras(dataTablesParameters).subscribe(response => {
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
        {title:"Id", data: 'compraid'},
        {title:"Proveedor", data: 'proveedornombre'},
        {title:"Nº articulos", render:(data,type,row)=>{
            return row.listainventario.length;
          }
        },
        {title:"Importe Neto", data: 'compraimporteneto'},
        {title:"IVA", data: 'compraimporteiva'},
        {title:"Importe Total", data: 'compraimportetotal'},
        {title:"Fecha", render:(data,type,row)=>{
          return this.datePipe.transform(row.comprafechacreacion, 'yyyy/MM/dd');
        }},
        //data: 'comprafechacreacion'}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
         // self.showDetalleEstudio(data);
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

  addDetalleCompra(){
    if(this.listaInventario && this.listaInventario.filter((inv)=>inv.tipoproductoid===this.inventario.tipoproductoid)[0]){
      Swal.fire({
        title: "Error",
        text: "Ya existe "+this.inventario.tipoproductoid,
        icon: "error"
      });
      return;
    }
    if(this.inventario==null || !this.inventario.tipoproductoid
      || this.inventario.tipoproductoid==undefined 
      || this.inventario.tipoproductoid<=0){
        Swal.fire({
          title: "Error",
          text: "Es necesario seleccionar el tipo de producto",
          icon: "error"
        });
        return;
    }
    if(this.inventario==null || !this.inventario.inventariocantidadoriginal
      || this.inventario.inventariocantidadoriginal==undefined 
      || this.inventario.inventariocantidadoriginal<=0){
        Swal.fire({
          title: "Error",
          text: "Es necesario indicar numero de unidades",
          icon: "error"
        });
        return;
    }
    if(this.inventario==null || !this.inventario.inventariocostoporunidad
      || this.inventario.inventariocostoporunidad==undefined 
      || this.inventario.inventariocostoporunidad<=0){
        Swal.fire({
          title: "Error",
          text: "Es necesario indicar el costo por unidad",
          icon: "error"
        });
        return;
    }
    console.log("Add>> "+JSON.stringify(this.inventario));
    this.listaInventario.push(this.inventario);
    this.inventario=new Inventario();
  }

  delProducto(tipoproductoid:any){
    console.log("Del producto "+tipoproductoid);
    this.listaInventario = this.listaInventario.filter((inventario) => inventario.tipoproductoid !== tipoproductoid);
  }

  guardarCompra():void{
    console.log("Se guardara ");
  }

  showFormAlta():void{
    this.showAgregarCompra=true;
  }

  cancelaAlta():void{
    this.showAgregarCompra=false;
    this.rerender();
  }

  getNombreProducto(producto:Inventario){
    let selected=this.listaProductos.filter((prod)=> 
      prod.tipoproductoid===producto.tipoproductoid)[0];
    if(selected)
      return selected.tipoproductonombre;
    else
      return "No especificado";
  }

}
