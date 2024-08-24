import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Doctores } from 'src/app/entity/Doctores';
import { Mensajes } from 'src/app/entity/Mensajes';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Constantes } from 'src/app/utils/Constantes';

@Component({
  selector: 'app-ma-mensajes',
  templateUrl: './ma-mensajes.component.html',
  styleUrls: ['./ma-mensajes.component.css']
})
export class MaMensajesComponent implements OnInit {
  @ViewChild('ShowMessage', { static: true }) 
  modalShowMessage!: TemplateRef<any>;
  minutosInterval:number=1;

  doctorinfo:Doctores=new Doctores();
  listaMensajes:Mensajes[]=[];

  getMessages=setInterval(()=>{
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+" - Consulta de mensajes.");
  }, this.minutosInterval*(1000*60));
  
  constructor(private modal: NgbModal,
    private mensajesService:MensajesService
  ) {}

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.mensajesService.listByDoctorid(this.doctorinfo.doctorid).subscribe({
      next: resp=>{
        if(resp){
          this.listaMensajes=resp;
        }
      },
      error: err=>{
        console.error("No se logro recuperar la lista de mensajes "+err);
      }
    })
  }
}
