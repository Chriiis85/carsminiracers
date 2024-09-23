import { Component } from '@angular/core';
import { DoorsComponent } from '../doors/doors.component';
import { Router } from '@angular/router';
import { DoorsCloseComponent } from '../doors-close/doors-close.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DoorsComponent, DoorsCloseComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {

  constructor(private router: Router) {}

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
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
