import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent {
  employeeId: string = '';  // Declarar employeeId
  message: string = '';      // Declarar message

  constructor(private http: HttpClient) {}

  // Método para registrar la entrada
  onClockIn() {
    const body = { employeeId: this.employeeId };

    this.http.post('http://localhost:5000/api/clockin/clockin', body).subscribe(
      response => {
        this.message = 'Entrada registrada';
        console.log(response);
      },
      error => {
        this.message = 'Error al registrar entrada';
        console.error(error);
      }
    );
  }

  // Método para registrar la salida
  onClockOut() {
    const body = { employeeId: this.employeeId };

    this.http.post('http://localhost:5000/api/clockin/clockout', body).subscribe(
      response => {
        this.message = 'Salida registrada';
        console.log(response);
      },
      error => {
        this.message = 'Error al registrar salida';
        console.error(error);
      }
    );
  }
}
