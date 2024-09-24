import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DoorsComponent } from "../../doors/doors.component";

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [DoorsComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {

  constructor(private router: Router) {}
  // Inyectar el servicio para poder usar sus propiedades
  private authService = inject(AuthService);

  //Cerrar Sesión
  logOut(){
    this.authService.logout();
    this.router.navigate(['/main']);
  }
}
