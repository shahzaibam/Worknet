import { Component } from '@angular/core';
import { AuthService } from "../../services/authService/auth.service";  // Asegúrate de que el path del servicio sea correcto

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'],
})
export class LoginEmployeeComponent {
  email?: string;
  password?: string;
  errorMessage: string = '';    // Mensaje de error en caso de fallo
  successMessage: string = '';  // Mensaje de éxito

  constructor(private authService: AuthService) {}




  deleteCrossButton() {
    this.errorMessage = "";
  }

  onSubmit() {
    if (this.email && this.password) {  // Verifica si el email y la contraseña están presentes
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Si el login es exitoso
          this.successMessage = response.message;  // Muestra mensaje de éxito
          console.log('Login exitoso:', response);
          // Aquí podrías hacer algo más, como redirigir al usuario a una página protegida
        },
        (error) => {
          // Si el login falla
          this.errorMessage = error.error.message || 'Error desconocido';  // Muestra el mensaje de error
          console.error('Error en el login:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingresa tu email y contraseña.';  // Mensaje si no se han ingresado datos
    }
  }




}
