import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { Pagos } from 'src/app/entity/Pagos';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { PagosService } from 'src/app/services/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-orden',
  templateUrl: './view-orden.component.html',
  styleUrls: ['./view-orden.component.css']
})
export class ViewOrdenComponent implements OnInit {
  @Input() orden!: Ordenes;
  // @Output() pagaOrden: EventEmitter<any> = new EventEmitter();
  pago!:Pagos;

  constructor(private router: Router, 
    private ordenService:OrdenesService,
    private pagosService: PagosService
  ){}

  ngOnInit(): void {
    this.pagosService.getPagoByOrdenId(this.orden.ordenid).subscribe({
      next: resp=>{
        if(resp){
          this.pago = resp;
        }
      },
      error: err=>{
        console.log("Se genero un error al buscar el pago "+err);
      }
    });
    /*this.ordenService.getOrden(1).subscribe(res=>{
      this.orden=res
    });*/
  }

  actualizaCostos(event:any, detalle:any){
    let descuento=event.target.value;
    let importeDescuento=0;
    let ordenimportedescuento=0;
    let importetotal=0;
    let importeiva=0;
    if(descuento==undefined || descuento==null 
      || descuento.toString().trim().length<1){
        Swal.fire('Actualizacion','Indica un importe en el descuento', 'info');
        event.target.value=0;
        return;
    }
    if(!(/^[0-9]*$/.test(descuento))){
      Swal.fire('Actualizacion','Solo se reciben numeros enteros', 'info');
      event.target.value=0;
      return;
    }
    descuento=Number(event.target.value);
    if(descuento<0 || descuento>100){
      Swal.fire('Actualizacion','El campo espera un numero en 0 y 100', 'info');
      event.target.value=0;
      return;
    }
    importeDescuento = Number(detalle.ordendetallecosto) * (Number(descuento)/100);
    console.log("det.ordendetallecosto> "+detalle.ordendetallecosto);
    console.log("event.target.value> "+descuento);
    console.log("importeDescuento> "+importeDescuento);
    const index = this.orden.ordenesdetalle.findIndex((sarchEstudio) => sarchEstudio.estudioid===detalle.estudioid);
    this.orden.ordenesdetalle[index].ordendetalledescuento=descuento;
    this.orden.ordenesdetalle[index].ordendetalleimportedescuento=importeDescuento;
    this.orden.ordenesdetalle[index].ordendetallecostofinal=Number(this.orden.ordenesdetalle[index].ordendetallecosto) - importeDescuento;
    this.orden.ordenesdetalle.forEach(det=>{
      importetotal+=Number(det.ordendetallecostofinal);
      ordenimportedescuento+=Number(det.ordendetalleimportedescuento);
    });
    importeiva=Number((importetotal/1.16)*0.16);
    console.log("importeDescuento="+importeDescuento);
    console.log("importetotal="+importetotal);
    this.orden.ordenimportedescuento=Number(ordenimportedescuento);
    this.orden.ordenimporteiva=Number(importeiva.toFixed(2));
    this.orden.ordenimportetotal=Number(importetotal);
  }

  PagarOrden(){
    console.log("Se procesa pago de orden");
    this.router.navigate(['/pagos'],{ queryParams: { data: JSON.stringify(this.orden) }});
  }
}
