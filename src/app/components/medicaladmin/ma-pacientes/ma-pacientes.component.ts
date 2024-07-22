import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Doctores } from 'src/app/entity/Doctores';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Constantes } from 'src/app/utils/Constantes';

@Component({
  selector: 'app-ma-pacientes',
  templateUrl: './ma-pacientes.component.html',
  styleUrls: ['./ma-pacientes.component.css']
})
export class MaPacientesComponent implements AfterViewInit, OnInit{
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  doctorinfo:Doctores=new Doctores();

  constructor(private pacienteService:PacientesService){}

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.doDataTable();
  }

  ngAfterViewInit(): void {
  }

  showDetallePaciente(paciente:any){
    alert("Mostrar "+paciente.pacientenombre);
  }

  doDataTable(){
    console.log("inicia datatable "+this.doctorinfo.doctorid);
    // this.pacienteService.getListByDoctorid(this.doctorinfo.doctorid).subscribe(response => {
    //   console.log("Recupero >> "+JSON.stringify(response));
    // });
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.pacienteService.getListByDoctorid(this.doctorinfo.doctorid).subscribe(response => {
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
        {title:"Id", data: 'pacienteid'},
        {title:"Nombre", data: 'pacientenombre'
          // render:(data,type,row)=>{
          //   return row.pacientenombre+" "+row.pacienteapellidopaterno+" "+row.pacienteapellidomaterno;
          // }
        },
        {title:"Sexo", data: 'pacientesexo'},
        {title:"Edad", data: 'pacienteedad'},
        {title:"Fecha", data: 'pacientefechacreacion'}
      ]
      // ,
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   $('td', row).off('click');
      //   $('td', row).on('click', () => {
      //     self.showDetallePaciente(data);
      //   });
      //   return row;
      // }
    };
  }
}
