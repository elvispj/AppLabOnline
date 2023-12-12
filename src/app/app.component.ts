import { Component } from '@angular/core';
import { MediaService } from './services/media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appLabOnline';
  url?: string;

  constructor(private mediaService: MediaService){}
  
  upload(event: any){
    const file = event.target.files[0];

    if(file){
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData)
          .subscribe(response=> {
            console.log('Response ',response);
            this.url=response.url;
          })
    }
  }

}
