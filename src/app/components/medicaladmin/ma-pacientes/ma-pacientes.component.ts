import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Doctores } from 'src/app/entity/Doctores';
import { Pacientes } from 'src/app/entity/Pacientes';
import { DoctoresService } from 'src/app/services/doctores.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Constantes } from 'src/app/utils/Constantes';
import * as moment from 'moment';

@Component({
  selector: 'app-ma-pacientes',
  templateUrl: './ma-pacientes.component.html',
  styleUrls: ['./ma-pacientes.component.css']
})
export class MaPacientesComponent implements OnInit{
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  doctorinfo:Doctores=new Doctores();
  pacienteShow:Pacientes=new Pacientes();
  ShowView:string="LISTA";

  constructor(private pacienteService:PacientesService){}

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.doDataTable();
  }

  reload(): void {
    if(this.dtElement.dtInstance){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }

  showDetallePaciente(paciente:any){
    this.pacienteShow=paciente;
    this.ShowView="DETALLE";
  }

  showEditarPaciente(paciente:any){
    this.pacienteShow=paciente;
    this.ShowView="AGREGAR";
  }

  agregarPaciente(){
    this.ShowView="AGREGAR";
  }

  showView(view:any){
    this.pacienteShow=new Pacientes();
    this.ShowView=view;
  }

  doDataTable(){
    console.log("inicia datatable "+this.doctorinfo.doctorid);
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
        {title:"Nombre", 
          render:(data,type,row)=>{
            return row.pacientenombre+" "+row.pacienteapellidopaterno+" "+row.pacienteapellidomaterno;
          }
        },
        {title:"Sexo", data: 'pacientesexo'},
        {title:"Edad", data: 'pacienteedad'},
        {title:"Fecha", 
          render:(data,type,row)=>{
            return moment(row.pacientefechacreacion).format('YYYY-MM-DD HH:mm:ss');
          }
        },
        {title: "Acciones", 
          render:(data,type,row)=>{
            return '<button type="button" class="btn btn-outline-info m-1 bt-s"><i class="fa-regular fa-eye"></i></button>'
            +'<button type="button" class="btn btn-outline-success m-1 bt-e"><i class="fa-regular fa-pen-to-square"></i></button>'
            +'<button type="button" class="btn btn-outline-danger m-1 bt-d"><i class="fa-solid fa-trash"></i></button>';
          }
        }
      ],
      drawCallback:() =>{
        $('.bt-s').on('click', (event:any) => {
          const paciente = $('#table_pacientes').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showDetallePaciente(paciente);
        });
        $('.bt-e').on('click', (event:any) => {
          const paciente = $('#table_pacientes').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showEditarPaciente(paciente);
        });
        $('.bt-d').on('click', (event:any) => {
          alert("Se eliminara");
        });
      }
    };
  }
}
