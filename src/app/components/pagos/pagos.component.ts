import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ordenes } from 'src/app/entity/Ordenes';
import { Int_PagoDetalle, Pagodetalle } from 'src/app/entity/Pagodetalle';
import { Pagos } from 'src/app/entity/Pagos';
import { Formaspago } from 'src/app/entity/Formaspago';
import { FormaspagoService } from 'src/app/services/formaspago.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from "@angular/common";
import { Movimientoscaja } from 'src/app/entity/Movimientoscaja';
import { Tiposmovimiento } from 'src/app/entity/Tiposmovimiento';
import { Usuarios } from 'src/app/entity/Usuarios';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  pipe = new DatePipe('es-MX');
  usuario: Usuarios = JSON.parse(sessionStorage.getItem("usuario")!);
  orden!: Ordenes;
  pago: Pagos=new Pagos();
  omitirProcesoPago:boolean=false;
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
  pagoimportependiente: number=0.0;
  pagoimportepagado: number=0.0;

  constructor(private router: ActivatedRoute,
    private formaspagoService: FormaspagoService,
    private pagosService: PagosService
  ){}

  ngOnInit(): void {
    this.formaspagoService.getAll().subscribe({
      next: resp=>{
        if(resp){
          this.listaFormasPago=resp;
        }
      },
      error: err=>{
        console.log("Se genero un error al buscar las formas de pago");
      }
    });
    this.router.queryParams.subscribe((params:any)=>{
      this.orden=JSON.parse(params.data);
      this.pago=new Pagos();
      this.pago.ordenid=this.orden.ordenid;
      this.pago.pagoimporte=this.orden.ordenimporte;
      this.pago.pagoiva=this.orden.ordenimporteiva;
      this.pago.pagoimportetotal=this.orden.ordenimportetotal;
    });

    this.doBuscaPago();
    
    this.doDataTable();
  }

  guardarPago(){
    if(this.listaIntpagodetalle.length>0){
      console.log("Inicia guardar pago");
      let listaPagodetalle:Pagodetalle[]=[];
      let totalDetallePago:number=0.0;
      this.listaIntpagodetalle.forEach((pagodet)=>{
        if(pagodet.pagodetalleid<1){
          let movimientoscaja:Movimientoscaja={
            movimientoid: 0,
            tipomovimientoid: 'ESTU',
            formapagoid: pagodet.formapagoid,
            usuarioid: this.usuario.usuarioid,
            corteid: 0,
            movimientocargo: 0,
            movimientoabono: pagodet.pagodetalleimporte,
            movimientosaldo: 0,
            movimientocomentarios: 'Se agrega pago por orden de estudio ID-'+this.orden.ordenid,
            movimientofecha: new Date(),
            bitacoraid: 0,
            formapago: new Formaspago(),
            tiposmovimiento: new Tiposmovimiento(),
            usuario: new Usuarios()
          };
          let pagodetalle:Pagodetalle={
            pagodetalleid: 0,
            pagoid: 0,
            movimientocajaid: 0,
            pagodetalleactivo: false,
            pagodetalleimporte: pagodet.pagodetalleimporte,
            pagodetallefechacreacion: new Date(),
            pagodetallefechamodificacion: new Date(),
            movimientoscaja: movimientoscaja
          };
          listaPagodetalle.push(pagodetalle);
        }
        totalDetallePago+=Number(pagodet.pagodetalleimporte);
      });
      if(totalDetallePago>this.pago.pagoimportetotal){
        Swal.fire('Guardar Pago','El importe total del detalle del pago es mayor al total de la orden de estudio', 'error');
        return;
      }
      if(this.pago.pagoid>0 && totalDetallePago<this.pago.pagoimportetotal){
        this.pago.pagoestatusid="PEN";
      }
      if(totalDetallePago===this.pago.pagoimportetotal){
        this.pago.pagoestatusid="PAG";
      }
      this.pago.pagodetalle=listaPagodetalle;
      this.pagosService.save(this.pago).subscribe({
        next: resp=>{
          if(resp){
            Swal.fire('Guardar Pago','Se guardo exitosamente el pago', 'success');
            this.doBuscaPago();
          } else{
            Swal.fire('Guardar Pago','No se proceso el pago', 'info');
          }
        },
        error: err=>{
          Swal.fire('Guardar Pago','Se genero un error al procesar el pago', 'error');
        }
      })
    } else {
      console.log("No se agregaron detalles del pago");
      Swal.fire('Guardar Pago','No se agregaron detalles del pago', 'error');
    }
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
    this.intpagodetalle.pagodetalleimporte=Number(this.intpagodetalle.pagodetalleimporte);
    this.pago.pagoimportetotal=Number(this.pago.pagoimportetotal);
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
    this.intpagodetalle.tipomovimientoid='ESTU';
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
    return Number(total);
  }

  doBuscaPago(){
    this.pagosService.getPagoByOrdenId(this.orden.ordenid).subscribe({
      next: resp=>{
        if(resp){
          this.pago=resp;
          this.omitirProcesoPago=(this.pago.pagoestatusid==='PAG' || this.pago.pagoestatusid==='CAN') ? true : false;
          this.listaIntpagodetalle=[];
          this.pago.pagodetalle.forEach((detalle)=>{
            let intpagodetalle:Int_PagoDetalle ={
              pagodetalleid: detalle.pagodetalleid,
              pagoid: detalle.pagoid,
              pagodetalleimporte: detalle.pagodetalleimporte,
              formapagoid: detalle.movimientoscaja?.formapagoid || '',
              formapagonombre: '',
              tipomovimientoid: detalle.movimientoscaja?.tipomovimientoid||'',
              usuarioid: detalle.movimientoscaja?.usuarioid || 0,
              pagodetallefechacreacion: detalle.pagodetallefechacreacion
            };
            this.listaIntpagodetalle.push(intpagodetalle);
            this.pagoimportepagado=this.getTotal();
            this.pagoimportependiente = Number(this.pago.pagoimportetotal)-this.pagoimportepagado;
          });
        } else{
          console.log("No se encontro informacion del pago");
        }
      },
      error: err=>{
        console.log("Se genero un error al consultar el pago");
      }
    });
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
