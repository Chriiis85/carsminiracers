import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoorsComponent } from "./doors/doors.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //Funcionamiento mostrar/ocultar constraseña
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  redirectInstagram(){
    window.open("https://www.instagram.com/carsminiracers.es/", "_blank");
  }
}
