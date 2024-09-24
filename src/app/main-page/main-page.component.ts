import { Component, inject } from '@angular/core';
import { DoorsComponent } from '../doors/doors.component';
import { Router } from '@angular/router';
import { DoorsCloseComponent } from '../doors-close/doors-close.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DoorsComponent, DoorsCloseComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {

  constructor(private router: Router) {}
  // Inyectar el servicio para poder usar sus propiedades
  private authService = inject(AuthService);
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  redirectInstagram() {
    window.open('https://www.instagram.com/carsminiracers.es/', '_blank');
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  redirectLogin() {
    //setTimeout(() => {
      this.router.navigate(['/login']);
    //}, 3000);
  }
}
