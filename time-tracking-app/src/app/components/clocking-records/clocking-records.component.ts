import { Component, Input, OnInit } from '@angular/core';
import {ClockingService} from "../../services/clocking.service";

@Component({
  selector: 'app-clocking-records',
  templateUrl: './clocking-records.component.html',
  styleUrls: ['./clocking-records.component.css']
})
export class ClockingRecordsComponent implements OnInit {
  @Input() clockingRecords: any[] = []; // Recibir registros como entrada

  constructor(private clockingService: ClockingService) {}

  ngOnInit(): void {
    this.fetchClockingRecords(); // Obtener registros al inicio
  }

  // Obtener registros de marcaje
  fetchClockingRecords() {
    this.clockingService.getClockingAll().subscribe(
      (data) => {
        this.clockingRecords = data.clockingRecords || data;  // Si la respuesta es un objeto con clockingRecords como propiedad
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Mostrar registros de entrada y salida en tabla
}
