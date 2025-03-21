import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ViewEstudiosComponent } from './components/view-estudios/view-estudios.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { authGuard } from './helpers/auth.guard';
import { NavComponent } from './components/nav/nav.component';
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleEstudioComponent } from './components/detalle-estudio/detalle-estudio.component';
import { ComprasComponent } from './components/compras/compras.component';
import { AdminDoctoresComponent } from './components/admin-doctores/admin-doctores.component';
import { DetalleDoctorComponent } from './components/detalle-doctor/detalle-doctor.component';
import { ViewOrdenComponent } from './components/view-orden/view-orden.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { MedicaladminComponent } from './components/medicaladmin/medicaladmin.component';
import { MaPacientesComponent } from './components/medicaladmin/ma-pacientes/ma-pacientes.component';
import { MaPerfilComponent } from './components/medicaladmin/ma-perfil/ma-perfil.component';
import { MaCitasComponent } from './components/medicaladmin/ma-citas/ma-citas.component';
import { MaMensajesComponent } from './components/medicaladmin/ma-mensajes/ma-mensajes.component';
import { MaMenuComponent } from './components/medicaladmin/ma-menu/ma-menu.component';
import { MaDashboardComponent } from './components/medicaladmin/ma-dashboard/ma-dashboard.component';
import { AltaordenComponent } from './components/altaorden/altaorden.component';
import { MaAltapacienteComponent } from './components/medicaladmin/ma-altapaciente/ma-altapaciente.component';
import { MaViewpacienteComponent } from './components/medicaladmin/ma-viewpaciente/ma-viewpaciente.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MaAgregarCitaComponent } from './components/medicaladmin/ma-citas/ma-agregar-cita/ma-agregar-cita.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";

registerLocaleData(localeEs);

const routes: Routes =[
  { path: '', component:DashboardComponent, canActivate: [authGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'estudios', component: EstudiosComponent, canActivate: [authGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: 'ordenes', component: OrdenesComponent, canActivate: [authGuard],
    children: [
      { path: '', component: OrdenesComponent, canActivate: [authGuard] },
      { path: 'altaorden', component: AltaordenComponent, canActivate: [authGuard] }
    ]
  },
  { path: 'compras', component: ComprasComponent, canActivate: [authGuard] },
  { path: 'admindoctores', component: AdminDoctoresComponent, canActivate: [authGuard] },
  { path: 'pagos', component: PagosComponent, canActivate: [authGuard] },
  { path: 'medicaladmin', component: MedicaladminComponent, canActivate: [authGuard] , 
    children: [
      {path: '', component: MaDashboardComponent, canActivate: [authGuard]},
      {path: 'dashboard', component: MaDashboardComponent, canActivate: [authGuard]},
      {path: 'pacientes', component: MaPacientesComponent, canActivate: [authGuard]},
      {path: 'perfil', component: MaPerfilComponent, canActivate: [authGuard]},
      {path: 'mensajes', component: MaMensajesComponent, canActivate: [authGuard]},
      {path: 'citas', component: MaCitasComponent, canActivate: [authGuard]}
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EstudiosComponent,
    OrdenesComponent,
    InventarioComponent,
    ViewEstudiosComponent,
    NavComponent,
    DetalleEstudioComponent,
    ComprasComponent,
    AdminDoctoresComponent,
    DetalleDoctorComponent,
    ViewOrdenComponent,
    PagosComponent,
    MedicaladminComponent,
    MaPacientesComponent,
    MaPerfilComponent,
    MaCitasComponent,
    MaMensajesComponent,
    MaMenuComponent,
    MaDashboardComponent,
    AltaordenComponent,
    MaAltapacienteComponent,
    MaViewpacienteComponent,
    MaAgregarCitaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgbModalModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
  {
    provide: DATE_PIPE_DEFAULT_OPTIONS,
    useValue: { dateFormat: "longDate" }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
