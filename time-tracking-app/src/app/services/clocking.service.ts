// clocking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {

  private apiUrl = 'http://localhost:5000/api/clocking'; // URL del backend

  // la url es esta en postman http://localhost:5000/api/clocking/clockin
  constructor(private http: HttpClient) { }

  // Marcar entrada
  clockIn(employeeId: string): Observable<any> {
    console.log(employeeId)
    return this.http.post(`${this.apiUrl}/clockin`, { employeeId });
  }

  // Marcar salida
  clockOut(employeeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clockout`, { employeeId });
  }

  // Obtener todos los registros de marcaje
  getClockingAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getclockingall`);
  }
}
