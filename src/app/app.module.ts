import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
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

const routes: Routes =[
  { path: '', component:DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'estudios', component: EstudiosComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'admindoctores', component: AdminDoctoresComponent }
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
    DetalleDoctorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
