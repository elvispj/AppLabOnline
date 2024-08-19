import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Doctorcitas } from 'src/app/entity/Doctorcitas';
import { DoctorcitasService } from 'src/app/services/doctorcitas.service';
import { Doctores } from 'src/app/entity/Doctores';
import { Constantes } from 'src/app/utils/Constantes';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Pacientes } from 'src/app/entity/Pacientes';
import { DataTableDirective } from 'angular-datatables';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-ma-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ma-citas.component.html',
  styleUrls: ['./ma-citas.component.css']
})
export class MaCitasComponent implements OnInit, AfterViewInit, OnDestroy {
  doctorinfo:Doctores=new Doctores();
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listaCitas: Doctorcitas[]=[];
  listaPacientes: Pacientes[]=[];

  formatter = new Intl.NumberFormat('es-MX');
  datepipe: DatePipe = new DatePipe('es-MX');

  @ViewChild('modalAlta', { static: true }) 
  modalAlta!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  locale: string = "es";
  activeDayIsOpen: boolean = true;
  // modalData!: {
  //   action: string;
  //   event: CalendarEvent;
  //   cita: Doctorcitas;
  // };

  colors: Record<string, EventColor> = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  constructor(private modal: NgbModal,
    private doctorCitasService: DoctorcitasService,
    private pacienteService:PacientesService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.doDataTable();
    this.pacienteService.getListByDoctorid(this.doctorinfo.doctorid).subscribe(response => {
      this.listaPacientes = response;
    });
    // this.doctorCitasService.getCitasByDoctorid(this.doctorinfo.doctorid).subscribe({
    //   next: resp=>{
    //     if(resp){
    //       this.listaCitas = resp;
    //     }else{
    //       console.log("No se encontraron citas");
    //     }
    //   },
    //   error: err=>{
    //     Swal.fire('Citas',`Se genero un error al recuperar las citas`, 'error');
    //   }
    // });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    console.log("eventTimesChanged");
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    let cita:Doctorcitas={
      citaid: 0,
      doctorid: this.doctorinfo.doctorid,
      pacienteid: 0,
      citaestatusid: 'NVO',
      citanombre: 'Cita de prueba',
      citafecha: new Date(),
      citalugar: 'Coyuca de benitez',
      citacomentarios: 'Sin comentarios',
      citafechacreacion: new Date(),
      citafechamodificacion: new Date()
    };
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(">> action "+action);
    console.log(">> seleccionado "+event.id);
    console.log("JSON >> "+JSON.stringify(this.listaCitas));
    let citas=this.listaCitas.filter((cit)=> Number(cit.citaid)===Number(event.id))[0];
    console.log(">> "+JSON.stringify(citas));
    switch(action){
      case "Clicked":

      break;
      case "Edited":

      break;
      case "Deleted":

      break;
    }
  }

  addEvent(): void {
    this.modal.open(this.modalAlta);
  }

  deleteEvent(eventToDelete: any) {
    this.listaCitas = this.listaCitas.filter((citaid) => citaid !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  doTransformEvent(lista:Doctorcitas[]){
    this.events=[];
    lista.forEach((cita)=>{
      let ev:CalendarEvent = {
        id: cita.citaid,
        start: new Date(cita.citafecha),
        end: addHours(new Date(cita.citafecha), 1),
        color: colors['red'],
        title: cita.citanombre,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      };
      this.events.push(ev);
    });
    this.listaCitas=lista;
  }

  altaCita(cita:any){
    console.log("Dio de alta "+JSON.stringify(cita));
    this.rerender();
    this.events = [
      ...this.events,
      {
        title: cita.citanombre,
        start: startOfDay(cita.citafecha),
        end: endOfDay(cita.citafecha),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  showEditarCita(cita:any){
    this.rerender();
    alert("Se editara >> "+cita);
  }

  showEliminarCita(citaAny:any) {
    let cita:Doctorcitas = citaAny;
    Swal.fire({
      title: "Esta seguro de cancelar la cita?",
      text: "La cancelacion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar cita",
      cancelButtonText: "Descartar!"
    }).then((result) => {
      if (result.isConfirmed) {
        cita.citaestatusid='CAN';
        this.doctorCitasService.saveCita(cita).subscribe({
          next: resp=>{
            if(resp){
              Swal.fire({
                title: "Cancelado!",
                text: "La cita se ha cancelado.",
                icon: "success"
              });
              this.rerender();
            }else{
              Swal.fire({
                title: "Warning",
                text: "No se logro cancelar la cita.",
                icon: "warning"
              });
            }
          },
          error: err=>{
            Swal.fire({
              title: "Error",
              text: "Se genero un error al cancelar la cita",
              icon: "error"
            });
          }
        })
      }
    });
  }

  rerender(): void {
    if(this.dtElement.dtInstance){
      this.dtElement.dtInstance.then((dt: DataTables.Api) => {
        // Destroy the table first
        dt.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(this.dtOptions);
      });
    }
  }

  reload(): void {
    console.log("Recarga la tabla");
    if(this.dtElement.dtInstance){
      console.log("a pintal la tabla");
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }

  doDataTable(){
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5,10,20,50],
      ajax: (dataTablesParameters: any, callback) => {
        console.log("dataTablesParameters >> "+JSON.stringify(dataTablesParameters));
        this.doctorCitasService.getCitasByDoctorid(this.doctorinfo.doctorid).subscribe(response => {
          this.doTransformEvent(response);
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
        {title:"Nombre", data: 'citanombre'},
        {title:"Fecha",
          // data: 'citafecha'
          render:(data,type,row)=>{
            // let fecha = row.vigencia.split("/")[2]+"-"+row.vigencia.split("/")[1]+"-"+row.vigencia.split("/")[0];
            return this.datepipe.transform(new Date(row.citafecha), 'yyyy-MM-dd');
          }
        },
        {title:"Hora",
          // , data: 'citalugar'
          render:(data,type,row)=>{
            return this.datepipe.transform(new Date(row.citafecha), 'HH:mm:ss');
          }
        },
        {title: " - - -", 
          render:(data,type,row)=>{
            return '<button type="button" class="btn btn-outline-success m-1 bt-e"><i class="fa-regular fa-pen-to-square"></i></button>'
            +'<button type="button" class="btn btn-outline-danger m-1 bt-d"><i class="fa-solid fa-trash"></i></button>';
          }, "className": "dt-center"
        }
      ],
      drawCallback:() =>{
        $('.bt-e').on('click', (event:any) => {
          const cita = $('#table_citas').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showEditarCita(cita);
        });
        $('.bt-d').on('click', (event:any) => {
          const cita = $('#table_citas').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showEliminarCita(cita)
        });
      }
    };
  }
}


// events: CalendarEvent[] = [
//   {
//     start: subDays(startOfDay(new Date()), 1),
//     end: addDays(new Date(), 1),
//     title: 'A 3 day event',
//     // color: { ...colors.red },
//     actions: this.actions,
//     allDay: true,
//     resizable: {
//       beforeStart: true,
//       afterEnd: true,
//     },
//     draggable: true,
//   },
//   {
//     start: startOfDay(new Date()),
//     title: 'An event with no end date',
//     // color: '#e3bc08',
//     actions: this.actions,
//   },
//   {
//     start: subDays(endOfMonth(new Date()), 3),
//     end: addDays(endOfMonth(new Date()), 3),
//     title: 'A long event that spans 2 months',
//     // color: '#1e90ff',
//     allDay: true,
//   },
//   {
//     start: addHours(startOfDay(new Date()), 2),
//     end: addHours(new Date(), 2),
//     title: 'A draggable and resizable event',
//     // color: '#e3bc08',
//     actions: this.actions,
//     resizable: {
//       beforeStart: true,
//       afterEnd: true,
//     },
//     draggable: true,
//   },
// ];