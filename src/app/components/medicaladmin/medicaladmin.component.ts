import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-medicaladmin',
  templateUrl: './medicaladmin.component.html',
  styleUrls: ['./medicaladmin.component.css']
})
export class MedicaladminComponent implements OnInit {

  titleView:any='Medical Admin';

  constructor(private elementRef:ElementRef,
    private loginService:LoginService, 
    private router: Router){}

  ngOnInit(): void {
    const hamBurger = this.elementRef.nativeElement.querySelector(".toggle-btn");

    hamBurger.addEventListener("click", () => {
      this.elementRef.nativeElement.querySelector("#sidebar").classList.toggle("expand");
    });
  }

  logout(){
    this.loginService.logout();
  }
}
