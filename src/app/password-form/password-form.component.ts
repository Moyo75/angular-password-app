import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordService } from '../password.service';
import { encryptPassword, decryptPassword } from '../utils';

@Component({
  selector: 'app-password-form',
  imports: [FormsModule],
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
})
export class PasswordFormComponent {
  newPassword = {
    category: '',
    app: '',
    userName: '',
    password: '',
  };

  constructor(private passwordService: PasswordService) {}

  addPassword(): void {
    const encryptedPassword = encryptPassword(this.newPassword.password);

    const passwordItem = {
      ...this.newPassword,
      encryptedPassword,
    };

    this.passwordService.addPassword(passwordItem).subscribe(() => {
      alert('Password added!');
      this.newPassword.category = '';
      this.newPassword.app = '';
      this.newPassword.userName = '';
      this.newPassword.password = '';
    });
  }

  editPassword(id: number, updatedPassword: string): void {
    const encryptedPassword = encryptPassword(updatedPassword);

    this.passwordService
      .updatePassword(id, { encryptedPassword })
      .subscribe(() => {
        alert('Password updated!');
      });
  }
}
