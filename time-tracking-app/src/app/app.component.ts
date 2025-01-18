import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'time-tracking-app';
  message: string = ''; // Definir la variable message
  clockingRecords: any[] = []; // Definir la variable clockingRecords

}
