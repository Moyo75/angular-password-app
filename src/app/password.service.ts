import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

interface PasswordItem {
  id?: number;
  category: string;
  app: string;
  userName: string;
  encryptedPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:3000/passwords';

  constructor(private http: HttpClient) {}

  // get all passwords
  getPasswords(): Observable<PasswordItem[]> {
    return this.http.get<PasswordItem[]>(this.apiUrl);
  }

  // get one password
  getPassword(id: number): Observable<PasswordItem> {
    return this.http.get<PasswordItem>(`${this.apiUrl}/${id}`);
  }

  // add a password
  addPassword(password: PasswordItem): Observable<PasswordItem> {
    return this.http.post<PasswordItem>(this.apiUrl, password);
  }

  // update an existing password
  updatePassword(
    id: number,
    password: Partial<PasswordItem>
  ): Observable<PasswordItem> {
    return this.http.patch<PasswordItem>(`${this.apiUrl}/${id}`, password);
  }

  // delete a password
  deletePassword(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
