import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService, Credential } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-resetpwd-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resetpwd-page.component.html',
  styleUrl: './resetpwd-page.component.css'
})
export class ResetpwdPageComponent {
 //Variable para recoger el mail a donde mandar el reseteo de pwd
 email: string = '';

 // Insertar el router para poder navegar hacia otras páginas
 constructor(public router: Router, private authService: AuthService) {}

 // Llamar al servicio para enviar el correo de restablecimiento
 async onResetPassword() {
   try {
     await this.authService.resetPassword(this.email);
     Swal.fire({
       didOpen: () => {
         // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
         document.body.classList.remove('swal2-height-auto');
       },
       title:'Correo de restablecimiento de contraseña enviado.',
       text: ' Revisa tu bandeja de entrada.',
       icon: 'success',
       confirmButtonText: 'Continuar',
       customClass: {
         popup: 'blur-popup',
       },
       backdrop: `
         rgba(0,0,0,0.75)
         left top
         no-repeat
       `
     });
     this.router.navigate(['/login']);
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
     } else if (error.message === 'Correo no encontrado') {
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
     }else {
       Swal.fire({
         didOpen: () => {
           // Eliminar la clase 'swal2-height-auto' cuando se abra el modal
           document.body.classList.remove('swal2-height-auto');
         },
         title: 'Error',
         text: 'Ocurrió un error al restablecer la contraseña. Intente de nuevo.',
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
}
