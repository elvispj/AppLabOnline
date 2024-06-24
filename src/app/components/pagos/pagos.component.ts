import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ordenes } from 'src/app/entity/Ordenes';
import { Int_PagoDetalle } from 'src/app/entity/Pagodetalle';
import { Pagos } from 'src/app/entity/Pagos';
import { Formaspago } from 'src/app/entity/Formaspago';
import { FormaspagoService } from 'src/app/services/formaspago.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from "@angular/common";

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  pipe = new DatePipe('es-MX');
  orden!: Ordenes;
  pago: Pagos=new Pagos();
  listaFormasPago: Formaspago[]=[];
  listaIntpagodetalle: Int_PagoDetalle[]=[];
  intpagodetalle: Int_PagoDetalle={
    pagodetalleid: 0,
    pagoid: 0,
    pagodetalleimporte: 0,
    formapagoid: '',
    formapagonombre: '',
    tipomovimientoid: '',
    usuarioid: 0,
    pagodetallefechacreacion: new Date()
  };
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: ActivatedRoute,
    private formaspagoService: FormaspagoService
  ){}

  ngOnInit(): void {
    this.formaspagoService.getAll().subscribe(resp=>{
      this.listaFormasPago=resp
    })

    this.router.queryParams.subscribe((params:any)=>{
      this.orden=JSON.parse(params.data);
      this.pago.ordenid=this.orden.ordenid;
      this.pago.pagoimporte=this.orden.ordenimporte;
      this.pago.pagoiva=this.orden.ordenimporteiva;
      this.pago.pagoimportetotal=this.orden.ordenimportetotal;
      console.log(JSON.stringify(this.pago));
    });
    
    this.doDataTable();
  }

  AgregarPagoDetalle(){
    let total=0;
    if(this.intpagodetalle.pagodetalleimporte==undefined 
        || this.intpagodetalle.pagodetalleimporte==null 
          || this.intpagodetalle.pagodetalleimporte.toString().trim().length<1){
        Swal.fire('Actualizacion','Indica un importe en el descuento', 'info');
        this.intpagodetalle.pagodetalleimporte=0;
        return;
    }
    if(this.intpagodetalle.formapagoid==undefined 
        || this.intpagodetalle.formapagoid==null 
          || this.intpagodetalle.formapagoid.toString().trim().length<1){
        Swal.fire('Actualizacion','Debes indicar una forma de pago', 'info');
        return;
    }
    if(!(/^(\-)?\d*(\.)?(\d*)?$/.test(this.intpagodetalle.pagodetalleimporte+""))){
      Swal.fire('Actualizacion','Solo se reciben numeros enteros', 'info');
      this.intpagodetalle.pagodetalleimporte=0;
      return;
    }
    if(this.intpagodetalle.pagodetalleimporte<=0){
      Swal.fire('Agregar Detalle','El importe debe ser mayor a cero', 'info');
      return;
    }
    if(this.intpagodetalle.pagodetalleimporte>this.pago.pagoimportetotal){
      Swal.fire('Agregar Detalle','El importe no puede ser mayor al total del pago', 'info');
      return;
    }
    this.listaIntpagodetalle.forEach(det=>{ total+=Number(det.pagodetalleimporte); });
    if((Number(this.intpagodetalle.pagodetalleimporte)+Number(total))>this.pago.pagoimportetotal){
      Swal.fire('Aviso','Se ha superado el importe del pago', 'warning');
      return;
    }
    this.listaIntpagodetalle.push(this.intpagodetalle);
    this.intpagodetalle={
      pagodetalleid: 0,
      pagoid: 0,
      pagodetalleimporte: 0,
      formapagoid: '',
      formapagonombre: '',
      tipomovimientoid: '',
      usuarioid: 0,
      pagodetallefechacreacion: new Date()
    };
  }

  eliminarDetalle(idfecha:Date){
    const format = 'yyyy-MM-dd_HH-mm:ss';
    const locale = 'en-US';
    const idSearch = formatDate(idfecha, format, locale);
    const index = this.listaIntpagodetalle.findIndex((sarchRow) => 
      formatDate(sarchRow.pagodetallefechacreacion, format, locale)===idSearch);
    this.listaIntpagodetalle.splice(index, 1);
  }

  getTotal() {
    let total=0;
    this.listaIntpagodetalle.forEach(det=>{ total+=Number(det.pagodetalleimporte); });
    return total;
  }

  doDataTable() {
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [10,20,50],
      data: this.orden.ordenesdetalle,
      columns: [
        {title:"Estudio", data: 'estudionombre'},
        {title:"Costo", data: 'ordendetallecosto'},
        {title:"Descuento", data: 'ordendetalleimportedescuento'},
        {title:"Costo Final", data: 'ordendetallecostofinal'},
        {title:"Acciones",
          render:(data,type,row)=>{
            if (row.ordendetalleactivo=='true') {                   
              return `<a name="Inactivar"class='statusT btn btn-warning btn-small'  style='color: white; font-size: 11px;' title='Inactivar Tarjeta'>
                      <i class='fas fa-lock' style='font-size:12px'></i></a>`;//fas fa-credit-card
            } else {
              return `<a name="Activar" class='statusT btn btn-success btn-small' style='color: white; font-size: 11px; ' title='Activar Tarjeta'>
                      <i class='fas fa-lock-open' style='font-size:12px'></i></a>`             
            }
          }        
        }
      ],
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   $('td', row).off('click');
      //   $('td', row).on('click', () => {
      //     self.showDetalleOrden(data);
      //   });
      //   return row;
      // },
      // drawCallback:() =>{
      //   $('.statusT').on('click', (event: any) => {          
      //     // Obtener el objeto de fila asociado al elemento en el que se hizo clic
      //     const rowData = $('.table') //selecciona la tabla con la clase 'table'.
      //                     .DataTable()//recuperamos la instancia del data table de la tabla
      //                     .row($(event.currentTarget).parents('tr'))//selecciona la fila (tr)  al elemento clicado
      //                     .data(); //devuelve los datos de la fila seleccionada
      //     const buttonName = $(event.currentTarget).attr('name');
      //     this.rowData(rowData,buttonName);
      //   });
      // },
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
}
