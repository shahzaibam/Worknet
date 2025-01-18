import { Component, EventEmitter, Output } from '@angular/core';
import {ClockingService} from "../../services/clockingService/clocking.service";

@Component({
  selector: 'app-clocking-buttons',
  templateUrl: './clocking-buttons.component.html',
  styleUrls: ['./clocking-buttons.component.css']
})
export class ClockingButtonsComponent {
  @Output() message = new EventEmitter<string>();
  @Output() clockingRecordsUpdated = new EventEmitter<any>(); // Emitir los registros actualizados

  employeeId:any;

  constructor(private clockingService: ClockingService) {}

  // Marcar entrada
  markClockIn() {
    this.clockingService.clockIn(this.employeeId).subscribe(
      (response) => {

        this.message.emit(`Entrada registrada ${this.employeeId}: ${response.clockInTime}`);
        this.clockingRecordsUpdated.emit(response); // Enviar el nuevo registro al componente de registros
      },
      (error) => {
        this.message.emit('Error al registrar entrada');
        console.error(error);
      }
    );
  }

  // Marcar salida
  markClockOut() {
    this.clockingService.clockOut(this.employeeId).subscribe(
      (response) => {
        this.message.emit(`Salida registrada: ${response.clockOutTime}`);
        this.clockingRecordsUpdated.emit(response);
      },
      (error) => {
        this.message.emit('Error al registrar salida');
        console.error(error);
      }
    );
  }

}
