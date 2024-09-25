import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DoorsComponent } from "../../doors/doors.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [DoorsComponent, CommonModule],
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

  //Funcion del boton Cerrar Sesión
  logOut(){
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  home(){
    this.router.navigate(['/main']);
  }



}
