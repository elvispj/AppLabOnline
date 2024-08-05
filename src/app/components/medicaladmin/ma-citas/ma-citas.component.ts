import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
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
export class MaCitasComponent implements OnInit {
  doctorinfo:Doctores=new Doctores();
  dtOptions: DataTables.Settings = {};
  locale: string = "es";
  listaCitas: Doctorcitas[]=[];

  @ViewChild('modalContent', { static: true }) 
  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
    cita: Doctorcitas;
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

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  constructor(private modal: NgbModal,
    private doctorCitasService: DoctorcitasService
  ) {}

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.doDataTable();
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

  activeDayIsOpen: boolean = true;

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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
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
    let cita: Doctorcitas={
      citaid: 0,
      doctorid: 0,
      pacienteid: 0,
      citaestatusid: '',
      citanombre: '',
      citafecha: new Date(),
      citalugar: '',
      citacomentarios: '',
      citafechacreacion: new Date(),
      citafechamodificacion: new Date()
    };
    this.modalData = { action, event, cita };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        // color: '#ad2121',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
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
    lista.forEach((cita)=>{
      let ev:CalendarEvent = {
        start: new Date(cita.citafecha),
        end: addHours(new Date(cita.citafecha), 1),
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
        {title:"Fecha", data: 'citafecha'},
        {title:"Lugar", data: 'citalugar'},
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
          const paciente = $('#table_citas').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showCita(paciente);
        });
        $('.bt-e').on('click', (event:any) => {
          const paciente = $('#table_citas').DataTable().row($(event.currentTarget).parents('tr')).data();
          this.showEditarCita(paciente);
        });
        $('.bt-d').on('click', (event:any) => {
          alert("Se eliminara");
        });
      }
    };
  }

  showCita(cita:any){
    alert("Se mostrara >> "+cita);
  }

  showEditarCita(cita:any){
    alert("Se editara >> "+cita);
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