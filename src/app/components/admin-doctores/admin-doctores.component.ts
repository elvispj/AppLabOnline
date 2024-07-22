import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Doctores } from 'src/app/entity/Doctores';
import { DoctoresService } from 'src/app/services/doctores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-doctores',
  templateUrl: './admin-doctores.component.html',
  styleUrls: ['./admin-doctores.component.css']
})
export class AdminDoctoresComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listaDoctores: Doctores[]=[];
  doctor: Doctores=new Doctores();
  doctorSeleccionado: Doctores=new Doctores();

  constructor(private doctorService: DoctoresService){}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.doctorService.getAll().subscribe(response => {
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
        {title:"Id", data: 'doctorid'},
        {title:"Nombre", data: 'doctornombre'},
        {title:"Apellido Paterno", data: 'doctorapellidopaterno'},
        {title:"Apellido Materno", data: 'doctorapellidomaterno'},
        {title:"Cedula", data: 'doctorcedula'},
        {title:"Titulo", data: 'doctortitulo'},
        {title:"Fecha", data: 'doctorfechamodificacion'}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.showDetalleDoctor(data);
        });
        return row;
      }
    };
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

  showDetalleDoctor(doctor:any){
    this.doctorSeleccionado = doctor;
  }

  altaDoctor():void{
    this.doctorService.saveDoctor(this.doctor).subscribe({
      next: res => {
        Swal.fire('Alta Doctor','Se agrego el doctor de forma exitosa', 'success');
        this.rerender();
        this.doctor=new Doctores();
      },
      error: err => {
        console.log("Error >> "+err);
        Swal.fire('Alta Doctor',`No se logro dar de alta`, 'error');
      }
    });
  }

  updateDoctor(doctor: Doctores){
    this.doctorService.saveDoctor(this.doctorSeleccionado).subscribe({
      next: res => {
        Swal.fire('Actualizar Doctor','Se actualizo el doctor de forma exitosa', 'success');
        this.rerender();
        this.doctorSeleccionado=new Doctores();
      },
      error: err => {
        console.log("Error >> "+err);
        Swal.fire('Actualizar Doctor',`No se logro actualizar`, 'error');
      }
    });
  }

  closeDetalle():void{
    this.doctorSeleccionado = new Doctores();
  }

}
