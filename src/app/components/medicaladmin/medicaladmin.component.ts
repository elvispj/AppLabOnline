import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-medicaladmin',
  templateUrl: './medicaladmin.component.html',
  styleUrls: ['./medicaladmin.component.css']
})
export class MedicaladminComponent implements OnInit {

  constructor(private elementRef:ElementRef,
    private loginService:LoginService, 
    private router: Router){}

  ngOnInit(): void {
    const toggler = this.elementRef.nativeElement.querySelector('.toggler')
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar')

    const showFull = () => {
      toggler.addEventListener('click', ()=> {
        toggler.classList.toggle('active')
        sidebar.classList.toggle('active')
      });
    }

    showFull();
  }

  logout(){
    this.loginService.logout();
  }
}
