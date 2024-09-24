import { Component, inject } from '@angular/core';
import { DoorsComponent } from '../../doors/doors.component';
import { DoorsCloseComponent } from '../../doors-close/doors-close.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Credential } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [DoorsComponent, DoorsCloseComponent, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  // Variables para recoger los valores de los campos del formulario
  email: string = '';
  pwd: string = '';

  // Insertar el router para poder navegar hacia otras páginas
  constructor(public router: Router) {}

  // Inyectar el servicio para poder usar sus propiedades
  private authService = inject(AuthService);
  //Iniciar Sesión con Email y Pwd
  async onLogin() {
    const credential: Credential = {
      email: this.email,
      password: this.pwd,
    };

    try {
      // Esperamos la respuesta de Firebase
      const userCredential = await this.authService.loginWithEmailAndPwd(
        credential
      );
      if (user && (await this.authService.isEmailVerified())) {
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido a la aplicación.',
          icon: 'success',
          confirmButtonText: 'Continuar',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
          rgba(0,0,0,0.75)
          left top
          no-repeat
        `,
        });

        // Si el usuario se ha logueado correctamente
        this.router.navigateByUrl('/');
        console.log(
          'Usuario logueado correctamente:',
          userCredential.user?.email
        );
      } else {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Usuario no verificado. Por favor, verifique su cuenta.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      }
    } catch (error: any) {
      // Capturamos los errores de autenticación
      console.error('Error al iniciar sesión:', error.message);

      // Manejar errores específicos con alertas
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-email'
      ) {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Usuario no encontrado. Por favor, verifica tu correo o usuario.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      } else if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/missing-password'
      ) {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Contraseña incorrecta. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      } else if (error.code === 'auth/user-disabled') {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Cuenta inhabilitada. Pruebe con otra.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      } else {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Ocurrió un error al iniciar sesión.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      }
    }
  }

  // Método para autenticación con Google
  async loginGoogle() {
    try {
      const userCredential = await this.authService.loginWithGoogle();
      const userEmail = userCredential.user?.email;
      console.log(userCredential);
      if (user && (await this.authService.isEmailVerified())) {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: '¡Inicio de sesión con Google exitoso!',
          text: 'Bienvenido a la aplicación.',
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => {
          this.router.navigateByUrl('/'); // Redirigir a la página principal
        });
      } else {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Usuario no verificado. Por favor, verifique su cuenta.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          customClass: {
            popup: 'blur-popup',
          },
          backdrop: `
            rgba(0,0,0,0.75)
            left top
            no-repeat
          `,
        });
      }
    } catch (error: any) {
      console.error('Error en la autenticación con Google:', error.message);
      if (error.code === 'auth/user-disabled') {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'La cuenta de Google esta deshabilitada. Pruebe con otra.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Ocurrió un error al iniciar sesión con Google.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    }
  }

  // Método para autenticación con Facebook
  async loginFacebook() {
    return 'Hola';
  }
}
