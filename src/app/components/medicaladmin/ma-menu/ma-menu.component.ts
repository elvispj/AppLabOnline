import { Component, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-ma-menu',
  templateUrl: './ma-menu.component.html',
  styleUrls: ['../medicaladmin.component.css']
})
export class MaMenuComponent {

  constructor(private loginService:LoginService){ }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }
}
