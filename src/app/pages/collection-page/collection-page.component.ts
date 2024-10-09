import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DoorsComponent } from "../../doors/doors.component";
import { CommonModule } from '@angular/common';
import { DoorsCloseComponent } from "../../doors-close/doors-close.component";
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [DoorsComponent, CommonModule, DoorsCloseComponent, CommonModule],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {

  constructor(private router: Router) {}

  // Inyectar el servicio para poder usar sus propiedades
  private authService = inject(AuthService);

  /*async ngOnInit() {
    this.isUserVerified = await this.userVerified();
  }
  isUserVerified: boolean = false
  async userVerified(): Promise<boolean> {
    return await this.authService.isEmailVerified();
  }*/

  username = this.authService.getUserName();
  showDoorsAnimation: boolean = false;

  //Funcion del boton Cerrar Sesión
  logOut(){
    this.authService.logout();
    this.showDoorsAnimation = true; // Muestra la animación de puertas

    setTimeout(() => {
      this.router.navigate(['/main']);
      this.showDoorsAnimation = false; // Oculta la animación después de redirigir
    }, 3400); // Tiempo que dure la animación (ajústalo según la duración real)
  }

  home(){
    this.showDoorsAnimation = true; // Muestra la animación de puertas

    setTimeout(() => {
      this.router.navigate(['/main']);
      this.showDoorsAnimation = false; // Oculta la animación después de redirigir
    }, 3400); // Tiempo que dure la animación (ajústalo según la duración real)
  }


}
