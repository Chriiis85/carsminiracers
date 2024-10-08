import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DoorsComponent } from "./doors/doors.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
