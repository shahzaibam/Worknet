import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // IMPORTAR tap desde rxjs/operators

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/users/login';  // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };

    return this.http.post<any>(this.apiUrl, credentials).pipe(
      // Aquí guardamos el token en el localStorage cuando se recibe la respuesta del backend
      tap(response => {
        if (response.token) {
          // Guardamos el token en localStorage
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;  // Devuelve true si el token existe y no es null
  }

  // Método para eliminar el token (logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
