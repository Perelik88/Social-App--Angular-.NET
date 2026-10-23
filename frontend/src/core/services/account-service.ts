import { Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoginCreds, RegisterCreds } from '../../interfaces/user';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Service()
export class AccountService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  private baseUrl = environment.apiUrl;

  login(creds: LoginCreds) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  register(creds: RegisterCreds) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
