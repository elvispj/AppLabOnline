import { Component, OnInit } from '@angular/core';
import { Doctores } from 'src/app/entity/Doctores';
import { Especialidades } from 'src/app/entity/Especialidades';
import { Constantes } from 'src/app/utils/Constantes';

@Component({
  selector: 'app-ma-dashboard',
  templateUrl: './ma-dashboard.component.html',
  styleUrls: ['./ma-dashboard.component.css']
})
export class MaDashboardComponent implements OnInit {
  texto_saludo:string="";
  doctorinfo:Doctores=new Doctores();
  listaEsp!:Especialidades[];

  ngOnInit(): void {
    this.doctorinfo = (Constantes.GetDoctorInfo()!);
    this.listaEsp=this.doctorinfo.especialidades;
    console.log(""+JSON.stringify(this.listaEsp));
    let hora = new Date().getHours();
    if(Number(hora)<12){
      this.texto_saludo="Buenos dias";
    } else if(Number(hora)>=19){
      this.texto_saludo="Buenos noches";
    } else {
      this.texto_saludo="Buenos tardes";
    }
  }
}
