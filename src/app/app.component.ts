import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PasswordListComponent } from './password-list/password-list.component';
import { PasswordFormComponent } from './password-form/password-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PasswordListComponent, PasswordFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'password-app-groupm';
}
