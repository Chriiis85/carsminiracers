import { Component } from '@angular/core';
import { DoorsComponent } from "../doors/doors.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DoorsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private router: Router){}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  redirectInstagram(){
    window.open("https://www.instagram.com/carsminiracers.es/", "_blank");
  }

  redirectLogin(){
    this.router.navigate(['/login'])
  }
}
