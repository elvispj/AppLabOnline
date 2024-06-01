import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listOpciones: string[]=[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.printpath('', this.router.config);
  }
  
  printpath(parent: string, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      if (route.path+'' != '') 
        this.listOpciones.push(''+route.path);

      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? `${parent}/${route.path}` : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
}
