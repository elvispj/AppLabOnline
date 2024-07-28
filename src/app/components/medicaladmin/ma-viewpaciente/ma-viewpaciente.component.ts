import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Doctores } from 'src/app/entity/Doctores';
import { Pacientes } from 'src/app/entity/Pacientes';

@Component({
  selector: 'app-ma-viewpaciente',
  templateUrl: './ma-viewpaciente.component.html',
  styleUrls: ['./ma-viewpaciente.component.css']
})
export class MaViewpacienteComponent implements OnInit {
  @Input() paciente!: Pacientes;
  @Input() doctor!: Doctores;

  public chartPresSan!:Chart;
  public charGlucosa!:Chart;
  public charRitmoCar!:Chart;
  public charColesterol!:Chart;

  labels:string[] = ["January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"];

  dataPresSan = {
    labels: this.labels,
    datasets: [{
      label: 'Presion Sanguinea',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: 'rgb(254, 0, 0)',
      tension: 0.1,
      backgroundColor: 'rgba(254, 0, 0, 0.427)'
    }]
  };

  dataGlucosa = {
    labels: this.labels,
    datasets: [{
      label: 'Glucosa',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: 'rgb(8, 0, 254)',
      tension: 0.1,
      backgroundColor: 'rgba(8, 0, 254, 0.427)'
    }]
  };

  dataRitmoCar = {
    labels: this.labels,
    datasets: [{
      label: 'Ritmo Cardiaco',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: 'rgb(42, 254, 0)',
      tension: 0.1,
      backgroundColor: 'rgba(42, 254, 0, 0.427)'
    }]
  };

  dataColesterol = {
    labels: this.labels,
    datasets: [{
      label: 'Colesterol',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: 'rgb(254, 246, 0)',
      tension: 0.1,
      backgroundColor: 'rgba(254, 246, 0, 0.427)'
    }]
  };

  constructor(){}

  ngOnInit(): void {
    this.chartPresSan=new Chart("chartPresSan",{
      type: 'line' as ChartType,
      data: this.dataPresSan
    });

    this.charGlucosa=new Chart("charGlucosa",{
      type: 'line' as ChartType,
      data: this.dataGlucosa,
    });

    this.charRitmoCar=new Chart("charRitmoCar",{
      type: 'line' as ChartType,
      data: this.dataRitmoCar,
    });

    this.charColesterol=new Chart("charColesterol",{
      type: 'line' as ChartType,
      data: this.dataColesterol,
    });
  }
}
