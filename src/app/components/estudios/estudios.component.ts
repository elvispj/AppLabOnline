import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent {
  listaOrdenes: Ordenes[]=[];

  constructor(private router: Router, 
    private activateRoute: ActivatedRoute, 
    private ordenesService: OrdenesService){}
  
  ngOnInit(): void {
    this.doCargaOrdenes();
  }

  doCargaOrdenes(){
    console.log("Van por las ordenes");
    this.ordenesService.getOrdenes().subscribe(
      res => this.listaOrdenes = res
    )
  }
}
