import { Component, Input } from '@angular/core';
import { Estudios } from 'src/app/entity/Estudios';
import { Tipoestudios } from 'src/app/entity/Tipoestudios';

@Component({
  selector: 'app-view-estudios',
  template: `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ tipoestudio.tipoestudionombre }}</h5>
      <p class="card-text">{{ tipoestudio.tipoestudioid}}, {{tipoestudio.tipoestudionombre }}</p>

      <ng-container *ngFor="let estudio of listaEstudios">
        <ng-container *ngIf="tipoestudio.tipoestudioid==estudio.estudioid">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" [checked]="false">
            <label class="form-check-label" for="defaultCheck1">
              {{estudio.estudioid}} {{estudio.estudionombre}}
            </label>
          </div>
        </ng-container>
      </ng-container>
    </div>
  </div>
  `,
  styleUrls: ['./view-estudios.component.css']
})
export class ViewEstudiosComponent {
  @Input() tipoestudio!: Tipoestudios;
  @Input() listaEstudios!: Estudios[];
}
