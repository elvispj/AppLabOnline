import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-view-orden',
  templateUrl: './view-orden.component.html',
  styleUrls: ['./view-orden.component.css']
})
export class ViewOrdenComponent implements OnInit {
  @Input() orden!: Ordenes;
  @Output() pagaOrden: EventEmitter<any> = new EventEmitter();

  constructor(private ordenService:OrdenesService){}

  ngOnInit(): void {
    /*this.ordenService.getOrden(1).subscribe(res=>{
      this.orden=res
    });*/
  }

  PagarOrden(){
    console.log("Se procesa pago de orden");
    this.pagaOrden.emit(this.orden);
  }
}
