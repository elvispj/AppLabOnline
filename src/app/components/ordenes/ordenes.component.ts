import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { createNgModule } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';
import { TipoestudiosService } from 'src/app/services/tipoestudios.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: Ordenes = new Ordenes();
  estudios: Estudios[] = [];
  tiposestudios: Tipoestudios[] = [];
  //formulario: FormGroup;

  constructor(private router: Router, 
    private ordenesService: OrdenesService, 
    private estudiosService: EstudiosService,
    private tipoestudiosService: TipoestudiosService){}

  ngOnInit(): void {
    this.estudiosService.getEstudios().subscribe(
      res=>this.procesarListaEstudios(res)
    )
    console.log("Ya solicito info "+this.estudios.length);
    
    this.tipoestudiosService.getAll().subscribe(
      res=>this.tiposestudios=res
    )
    console.log("Ya solicito tiposestudios "+this.tiposestudios.length);
      /*this.formulario = new FormGroup({
        'nombre': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'direcciones': new FormArray([])
      });*/
  }

  procesarListaEstudios(lista:Estudios[]){
    this.estudios=lista;
    for(let i=0; i<lista.length; i++){
      if(lista[i].tipoestudioid>0){

      }
    }
  }

  altaOrdenEstudio(){
    console.log("Llego >>"+this.ordenes.ordennombre);
    this.ordenesService.saveAlumno(this.ordenes).subscribe(
      res => {
        console.log(res)
      },
      err => console.error(err)
    )
  }
}
 