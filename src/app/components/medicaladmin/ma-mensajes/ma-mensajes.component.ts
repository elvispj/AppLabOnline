import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Doctores } from 'src/app/entity/Doctores';
import { Mensajes } from 'src/app/entity/Mensajes';
import { Mensajetipos } from 'src/app/entity/Mensajetipos';
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
  minutosInterval:number=5;

  doctorinfo:Doctores=new Doctores();
  listaMensajes:Mensajes[]=[];
  mensajeSeleccionado!:Mensajes;
  listMensajeTipos:Mensajetipos[]=[];

  getMessages=setInterval(()=>{
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+" - Consulta de mensajes.");
      this.doBuscaMensajes();
  }, this.minutosInterval*(1000*60));
  
  constructor(private modal: NgbModal,
    private mensajesService:MensajesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.mensajesService.getMensajeTipos().subscribe({
      next: resp=>{
        if(resp){
          console.log("Recupero "+resp.length);
          this.listMensajeTipos=resp;
        }
      }
    });
    setTimeout(()=>{
      this.doBuscaMensajes()
    }, 1000);
    
    // this.elementRef.nativeElement.querySelector("#in_search").value="";
  }

  doLoadMessage(mensaje:any){
    this.mensajeSeleccionado=mensaje;
    if(mensaje.mensajeestatusid==='NVO'){
      mensaje.mensajeestatusid='LEE';
      this.mensajesService.save(mensaje).subscribe({
        next:resp=>{
          if(resp){
            console.log("Se actualizo el mensaje");
          } else{
            console.warn("No se logro atualizar el mensaje");
          }
        },
        error: err=>{
          console.error("Se genero un error al actualizar el mensaje",err);
        }
      });
    }
  }

  doBuscaMensajes(){
    console.log("list "+JSON.stringify(this.listMensajeTipos));
    this.mensajesService.listByDoctorid(this.doctorinfo.doctorid).subscribe({
      next: resp=>{
        if(resp){
          resp.forEach((mensaje)=>{
            mensaje.mensajetipo=this.listMensajeTipos.filter((tipo)=>tipo.mensajetipoid===mensaje.mensajetipoid)[0];
            console.log("mensaje.mensajetipo >> "+JSON.stringify(mensaje.mensajetipo));
          });
          this.listaMensajes=resp;
        }
      },
      error: err=>{
        console.error("No se logro recuperar la lista de mensajes "+err);
      }
    });
  }

  getMensajeTipoNombre(mensaje:any){
    let mensajetiponombre=this.listMensajeTipos.filter((tipo)=>tipo.mensajetipoid===mensaje.mensajetipoid)[0];
    if(mensajetiponombre){
      return mensajetiponombre;
    }else{
      return mensaje.mensajetipoid;
    }
  }

  doCloseMessage(){
    this.mensajeSeleccionado=new Mensajes();
  }
}
