import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../interfaces/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  protected errorMessage = '';

  cancelRegister = output<void>();

  register() {
    this.errorMessage = '';
    this.accountService.register(this.creds).subscribe({
      next: () => this.cancel(),
      error: err => (this.errorMessage = err.error ?? 'Registration failed'),
    });
  }

  cancel() {
    this.creds = {} as RegisterCreds;
    this.cancelRegister.emit();
  }
}
