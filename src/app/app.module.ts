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

const routes: Routes =[
  { path: '', component:DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'estudios', component: EstudiosComponent, canActivate: [authGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: 'ordenes', component: OrdenesComponent, canActivate: [authGuard] },
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
    NavComponent
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
