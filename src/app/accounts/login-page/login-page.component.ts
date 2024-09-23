import { Component } from '@angular/core';
import { DoorsComponent } from "../../doors/doors.component";
import { DoorsCloseComponent } from "../../doors-close/doors-close.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [DoorsComponent, DoorsCloseComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
