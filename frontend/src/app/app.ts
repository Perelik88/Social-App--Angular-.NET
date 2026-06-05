import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('frontend');
  protected users = signal<any[]>([]);

  // ngOnInit() {
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => {
  //       this.users.set(response as any[]);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //     complete: () => {
  //       console.log('Request completed');
  //     }
  //   });
  // }

  async ngOnInit() {
    this.users.set(await this.fetchUsers() as any[]);
   }

  async fetchUsers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/users'));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
