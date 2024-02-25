import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/entity/Menus';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  listaMenus: Menu[]=[];

  constructor(private loginService:LoginService){ }

  ngOnInit(): void {
    /*

  { path: 'login', component: LoginComponent },
  { path: 'estudios', component: EstudiosComponent, canActivate: [authGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: 'ordenes', component: OrdenesComponent, canActivate: [authGuard] },
  { path: 'compras', component: ComprasComponent, canActivate: [authGuard] },
  { path: 'admindoctores', component: AdminDoctoresComponent, canActivate: [authGuard] }
    */
    this.listaMenus.push({ menuid: 0, menunombre: 'Dashboard', menudescripcion: '', menupath: ''});
    this.listaMenus.push({ menuid: 0, menunombre: 'Estudios', menudescripcion: '', menupath: 'estudios'});
    this.listaMenus.push({ menuid: 0, menunombre: 'Inventario', menudescripcion: '', menupath: 'inventario'});
    this.listaMenus.push({ menuid: 0, menunombre: 'Ordenes', menudescripcion: '', menupath: 'ordenes'});
    this.listaMenus.push({ menuid: 0, menunombre: 'Compras', menudescripcion: '', menupath: 'compras'});
    this.listaMenus.push({ menuid: 0, menunombre: 'Admin Doctores', menudescripcion: '', menupath: 'admindoctores'});
  }

  logout(){
    this.loginService.logout();
  }
}
