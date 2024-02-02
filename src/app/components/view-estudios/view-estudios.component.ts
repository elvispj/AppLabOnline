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
        <ng-container *ngIf="tipoestudio.tipoestudioid==estudio.tipoestudioid">
          <div class="form-check">
            <input (change)="onCategoriaPressed(estudio,$any($event.target)?.checked)" 
              type="checkbox" class="form-check-input" [checked]="false">
            <label class="form-check-label" for="defaultCheck_{{estudio.estudioid}}">
              {{estudio.estudionombre}}
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
onCategoriaPressed(_t7: Estudios,arg1: any) {
throw new Error('Method not implemented.');
}
  @Input() tipoestudio!: Tipoestudios;
  @Input() listaEstudios!: Estudios[];
}
