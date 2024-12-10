import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordService } from '../password.service';
import { decryptPassword, encryptPassword } from '../utils';

@Component({
  selector: 'app-password-list',
  imports: [CommonModule],
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent implements OnInit {
  passwords: any[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.passwordService.getPasswords().subscribe((data) => {
      this.passwords = data.map((item) => ({
        ...item,
        decryptedPassword: decryptPassword(item.encryptedPassword),
      }));
    });
  }

  deletePassword(id: number): void {
    this.passwordService.deletePassword(id).subscribe(() => {
      this.passwords = this.passwords.filter((password) => password.id !== id);
      alert('Password deleted successfully!');
    });
  }

  editPassword(id: number): void {
    const passwordItem = this.passwords.find((p) => p.id === id);
    const newPassword = prompt(
      'Enter the new password:',
      passwordItem?.decryptedPassword
    );
    if (newPassword) {
      const encryptedPassword = encryptPassword(newPassword);
      this.passwordService
        .updatePassword(id, { encryptedPassword })
        .subscribe(() => {
          passwordItem.encryptedPassword = encryptedPassword;
          passwordItem.decryptedPassword = newPassword;
          alert('Password updated successfully!');
        });
    }
  }
}
