import { Component, inject } from '@angular/core';
import { AuthService, Credential } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { DoorsComponent } from "../../doors/doors.component";

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [FormsModule, DoorsComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {
  //Variables para recoger los valores de los campos del formulario
  email: string = '';
  pwd: string = '';

  //Inyectar el servicio para poder usar sus propiedades
  private authService = inject(AuthService);

  //Insertar el router para poder navegar hacia otras paginas
  constructor(public router: Router) {}

  // Método para autenticación con Google
  async signInGoogle() {
    try {
      const userCredential = await this.authService.signWithGoogle();
      const userEmail = userCredential.user?.email;
      console.log(userCredential);
      Swal.fire({
        didOpen: () => {
          // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
          document.body.classList.remove('swal2-height-auto');
        },
        title: '¡Registro con Google exitoso!',
        text: 'Verifique su correo para validar su cuenta.',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        this.router.navigateByUrl('/collection'); // Redirigir a la página principal
      });
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

  // Método para manejar el formulario
  async onRegister() {
    const credential: Credential = {
      email: this.email,
      password: this.pwd,
    };

    try {
      // Eperamos la respuesta de Firebase
      const userCredential = await this.authService.signUpWithEmailAndPwd(
        credential
      );
      Swal.fire({
        didOpen: () => {
          // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
          document.body.classList.remove('swal2-height-auto');
        },
        title: '¡Registro de cuenta exitoso!',
        text: 'Verifique su correo para validar su cuenta.',
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
      this.router.navigateByUrl('/collection');
      console.log(
        'Usuario registrado correctamente:',
        userCredential.user?.email
      );
    } catch (error: any) {
      // Capturamos los errores de autenticación
      console.error('Error al iniciar sesión:', error.message);

      // Manejar errores específicos
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Usuario ya existente. Por favor, introduzca otro correo o usuario.',
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
        error.code === 'auth/weak-password' ||
        error.code === 'auth/missing-password'
      ) {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'La contraseña no es válida. Por favor, especifique otra contraseña.',
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
      } else if (error.code === 'auth/missing-email') {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'El correo no es válido. Por favor, especifique otro correo o usuario.',
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
      } else {
        Swal.fire({
          didOpen: () => {
            // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
            document.body.classList.remove('swal2-height-auto');
          },
          title: 'Error',
          text: 'Ocurrió un error al crear la cuenta. Intente de nuevo.',
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

  // Método para autenticación con Facebook
  async signInFacebook() {
    return '';
  }
}
