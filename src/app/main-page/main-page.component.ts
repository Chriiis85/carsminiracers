import { Component, inject } from '@angular/core';
import { DoorsComponent } from '../doors/doors.component';
import { Router } from '@angular/router';
import { DoorsCloseComponent } from '../doors-close/doors-close.component';
import { AuthService } from '../services/auth.service';
import { user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DoorsComponent, DoorsCloseComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {

  constructor(private router: Router) {}
  showDoorsAnimation: boolean = false;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  redirectInstagram() {
    window.open('https://www.instagram.com/carsminiracers.es/', '_blank');
  }

  redirectLogin() {
    this.showDoorsAnimation = true; // Muestra la animación de puertas

    setTimeout(() => {
      if (user) {
        this.router.navigate(['/collection']);
      } else {
        this.router.navigate(['/login']);
      }
      
      this.showDoorsAnimation = false; // Oculta la animación después de redirigir
    }, 3400); // Tiempo que dure la animación (ajústalo según la duración real)
  }
}
