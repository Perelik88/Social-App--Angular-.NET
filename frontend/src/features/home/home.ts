import { Component, signal } from '@angular/core';
import { Register } from '../account/register/register';

@Component({
  imports: [Register],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  protected registerMode = signal(false);

  showRegister() {
    this.registerMode.set(true);
  }

  cancelRegister() {
    this.registerMode.set(false);
  }

}
