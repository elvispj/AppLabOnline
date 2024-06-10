import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ordenes } from 'src/app/entity/Ordenes';
import { Int_PagoDetalle } from 'src/app/entity/Pagodetalle';
import { Formaspago } from 'src/app/entity/formaspago';
import { Pagos } from 'src/app/entity/pagos';
import { FormaspagoService } from 'src/app/services/formaspago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  orden!: Ordenes;
  pago: Pagos=new Pagos();
  listaFormasPago: Formaspago[]=[];
  listaIntpagodetalle: Int_PagoDetalle[]=[];
  intpagodetallenuevo: Int_PagoDetalle={
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
      this.orden=JSON.parse(params.data)
      // console.log(JSON.stringify(this.orden));
      this.pago.ordenid=this.orden.ordenid;
      this.pago.pagoimporte=this.orden.ordenimporte;
      this.pago.pagoiva=this.orden.ordenimporteiva;
      this.pago.pagoimportetotal=this.orden.ordenimportetotal;
      console.log(JSON.stringify(this.pago));
    });
    // let importe:number=0.0;
    // this.orden.ordenesdetalle.forEach(ordenesdetalle=>{
    //   importe+=ordenesdetalle.ordendetallecostofinal;
    // });
    this.doDataTable();
  }

  AgregarPagoDetalle(){
    this.listaIntpagodetalle.push(this.intpagodetallenuevo);
    this.intpagodetallenuevo={
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
