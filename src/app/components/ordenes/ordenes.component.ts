import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { DataTableDirective } from 'angular-datatables';
import { Clientes } from 'src/app/entity/Clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  active = 1;
  ordenes: Ordenes = new Ordenes();
  estudios: Estudios[] = [];
  tiposestudios: Tipoestudios[] = [];
  listaDoctores: Doctores[] = [];
  listaFormasEntrega: string[]=["Impreso","Whatsapp","Correo"];
  listaComoUbico: string[]=["Solo","Clinica","Volantes","Facebook","Perifoneo"];
  listaOrigen: string[]=["Laboratorio","Clinica","Referido"];
  listaOrdenes: Ordenes[]=[];
  listaBusquedaCliente: Clientes[]=[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listFormasPagos: any[]=[
    {formapagoid:"EFECTIVO", formapagonombre:"Pago en efectivo"},
    {formapagoid:"TARJETA_CREDITO", formapagonombre:"Pago con tarjeta credito"},
    {formapagoid:"TARJETA_DEBITO", formapagonombre:"Pago con tarjeta debito"},
    {formapagoid:"TRANSFERENCIA", formapagonombre:"Transferencia bancaria"}
  ];

  constructor(private router: Router, 
    private ordenesService: OrdenesService, 
    private estudiosService: EstudiosService,
    private tipoestudiosService: TipoestudiosService,
    private doctoresService: DoctoresService,
    private clientesService: ClientesService){}


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
      ]
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

  addEstudio(addOrdendetalle: Ordendetalle): void{
    this.ordenes.ordenesdetalle.push(addOrdendetalle);
    this.updateCostoFinalOrden();
  }

  delEstudio(delOrdentalle: Ordendetalle): void{
    const index = this.ordenes.ordenesdetalle.findIndex((sarchEstudio) => sarchEstudio.estudioid===delOrdentalle.estudioid);
    this.ordenes.ordenesdetalle.splice(index,1);
    this.updateCostoFinalOrden();
  }

  updateCostoFinalOrden():void{
    let promedioDescuentos=0.0;
    let totalDescuentos=0.0;
    let importetotal=0.0;
    this.ordenes.ordenimporte=0.0;
    this.ordenes.ordenimportetotal=0.0;
    this.ordenes.ordenesdetalle.forEach(obj=>{
      totalDescuentos=totalDescuentos+(Number(obj.ordendetalledescuento)/100);
      console.log("----------- obj.estudio.estudionombre > "+obj.estudio.estudionombre);
      console.log("obj.ordendetalledescuento > "+obj.ordendetalledescuento);
      console.log("obj.ordendetallecosto > "+obj.ordendetallecosto);
      obj.ordendetallecostofinal=obj.ordendetallecosto - ((Number(obj.ordendetalledescuento)/100)*Number(obj.ordendetallecosto));
      console.log("obj.ordendetallecostofinal > "+obj.ordendetallecostofinal);
      this.ordenes.ordenimporte=Number(this.ordenes.ordenimporte)+Number(obj.ordendetallecosto);
      importetotal=Number(importetotal)+Number(obj.ordendetallecostofinal);
//      this.ordenes.ordenimportetotal=Number(this.ordenes.ordenimportetotal)+Number(obj.ordendetallecostofinal);
      console.log("------------------------------------------------------------------");
    });
    promedioDescuentos=totalDescuentos/this.ordenes.ordenesdetalle.length;
    this.ordenes.ordenimportetotal=importetotal;
    this.ordenes.ordendescuento=Number(isNaN(promedioDescuentos) ? promedioDescuentos : promedioDescuentos.toFixed(2));
    this.ordenes.ordenimportedescuento=this.ordenes.ordenimporte-this.ordenes.ordenimportetotal;
    this.ordenes.ordenimportetotal=Number(this.ordenes.ordenimportetotal)+Number(this.ordenes.ordenimporteotrocobro);
    this.ordenes.ordenimporteiva=Number(((this.ordenes.ordenimportetotal/1.16)*0.16).toFixed(2));
    this.ordenes.ordenimportetotal=Number(this.ordenes.ordenimportetotal)-Number(this.ordenes.ordenimportemaquila);
  }

  altaOrdenEstudio(){
    console.log("Llego >>"+JSON.stringify(this.ordenes));
    if(this.ordenes.ordenesdetalle==undefined || this.ordenes.ordenesdetalle==null || this.ordenes.ordenesdetalle.length<1){
      Swal.fire('Alta de Orden',`No se logro dar de alta la orden porque no se selecciono ningun estudio.`, 'error')
      return;
    }else{
      if(this.ordenes.cliente.clienteid>0){
        console.log("Utiliza el json cliente");
        this.ordenes.clienteid=this.ordenes.cliente.clienteid;
      }else{
        console.log("Genera un nuevo json cliente");
        let cliente:Clientes=new Clientes();
        
        cliente.clientetipo='PACIENTE';
        cliente.clientenombre=this.ordenes.ordennombre;
        cliente.clienteapellidopaterno=this.ordenes.ordennombre;
        cliente.clienteapellidomaterno=this.ordenes.ordennombre;
        cliente.clienteedad=this.ordenes.ordenedad;
        cliente.clientesexo=this.ordenes.ordensexo;
        cliente.clientetelefono=this.ordenes.ordentelefono;
        cliente.clientedireccion=this.ordenes.ordendireccion;
        cliente.clientedatosclinicos=this.ordenes.ordendatosclinicos;

        this.ordenes.cliente=cliente;
      }
      console.log("Guardara "+JSON.stringify(this.ordenes));
      this.ordenesService.saveOrden(this.ordenes).subscribe({
        next: res => {
          console.log(res);
          Swal.fire('Alta Doctor', 'Se agrego la orden de forma exitosa', 'success');
          this.ordenes=new Ordenes();
        },
        error: err => {
          console.error(err);
          Swal.fire('Alta Orden',`No se logro guardar la orden`, 'error');
        }
      });
    }
  }

  procesarListaEstudios(lista:Estudios[]){
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

  updateCostoFinalEstudio(event:any, det:Ordendetalle){
    let importeDescuento = Number(det.ordendetallecosto) * (Number(event.target.value)/100);
    console.log("***************************************************************************");
    console.log(JSON.stringify(det));
    console.log("det.ordendetallecosto> "+det.ordendetallecosto);
    console.log("event.target.value> "+event.target.value);
    console.log("importeDescuento> "+importeDescuento);
    const index = this.ordenes.ordenesdetalle.findIndex((sarchEstudio) => sarchEstudio.estudioid===det.estudioid);
    this.ordenes.ordenesdetalle[index].ordendetalledescuento=event.target.value;
    this.ordenes.ordenesdetalle[index].ordendetalleimportedescuento=importeDescuento;
    this.ordenes.ordenesdetalle[index].ordendetallecostofinal=Number(this.ordenes.ordenesdetalle[index].ordendetallecosto) - importeDescuento;

    $("#ordendetallecostofinal_"+det.estudioid).val(this.ordenes.ordenesdetalle[index].ordendetallecostofinal);
    console.log(JSON.stringify(this.ordenes.ordenesdetalle[index]));
    console.log("***************************************************************************");
    this.updateCostoFinalOrden();
  }

  buscarPaciente():void{
    this.clientesService.search(this.ordenes.ordennombre).subscribe({
      next: res=>{
        console.log("Arrojo "+res.length+" resultados");
        if(res.length>0){
          this.listaBusquedaCliente = res;
        }else{
          Swal.fire('Busqueda Paciente','No se encontraron coincidencias', 'info');
        }
      },
      error: err=>{
        console.error(err);
        Swal.fire('Busqueda Paciente','Se genero un error al procesar la solicitud', 'error');
      }
    })
  }

  cargarInfoCliente(clienteSeleccionado:Clientes):void{
    console.log(JSON.stringify(this.ordenes));
    this.ordenes.cliente=clienteSeleccionado;
    this.ordenes.ordennombre=clienteSeleccionado.clientenombre
                        +' '+clienteSeleccionado.clienteapellidopaterno
                        +' '+clienteSeleccionado.clienteapellidomaterno;
    this.ordenes.ordenedad=clienteSeleccionado.clienteedad;
    this.ordenes.ordensexo=clienteSeleccionado.clientesexo;
    this.ordenes.ordendatosclinicos=clienteSeleccionado.clientedatosclinicos;
    this.ordenes.ordendireccion=clienteSeleccionado.clientedireccion;
    this.ordenes.ordentelefono=clienteSeleccionado.clientetelefono;
    this.listaBusquedaCliente=[];
  }

  limpiarBusqueda():void{
    this.listaBusquedaCliente=[];
  }
}
 