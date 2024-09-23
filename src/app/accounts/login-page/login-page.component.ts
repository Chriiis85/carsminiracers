import { Component } from '@angular/core';
import { DoorsComponent } from "../../doors/doors.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [DoorsComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
