import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ordenes } from 'src/app/entity/Ordenes';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  constructor(private router: Router, 
    private activateRoute: ActivatedRoute, 
    private ordenesService: OrdenesService,
    private http: HttpClient){}
  
  ngOnInit(): void {
    
    /*
    this.dtOptions = {
      pagingType: "full_numbers",
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.http.post<any>(this.ordenesService.getURLOrdenes(), JSON.stringify(dataTablesParameters))
          .subscribe(response => {
            console.log(" respuesta "+JSON.stringify(response));
            callback({
              recordsTotal: response.totalRecords,
              recordsFiltered: response.filteredRecords,
              data: JSON.parse(response.data)
            });
          });
      },
      columns: [
        {title:"Id", data: 'ordenid'},
        {title:"Nombre", data: 'ordennombre'},
        {title:"Fecha", data: 'ordenfechacreacion'},
        {title:"Importe total", data: 'ordenimportetotal'}
      ], 
    };*/
  }
}

    /*

    this.dtOptions = {
      pagingType: "full_numbers",
      serverSide: true,
      responsive:true,
      data: this.listaOrdenes,
      columns: [
        {title:"Id", data: 'ordenid'},
        {title:"Nombre", data: 'ordennombre'},
        {title:"Fecha", data: 'ordenfechacreacion'},
        {title:"Importe total", data: 'ordenimportetotal'}
      ]
    };
    
    */