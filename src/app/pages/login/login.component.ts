import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['noureladawy418@gmail.com', [Validators.required, Validators.email]],
      password: ['123@123', [Validators.required, Validators.minLength(7)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.querySelector<HTMLInputElement>('input[formControlName="password"]');
    if (input) input.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = null;
    this.successMsg = null;

    const { email, password } = this.form.value;
    const apiUrl = `https://erpapi.nc.sa/erp/Erp_Users/erp_login?email=${email}&password=${password}&lang=ar`;

    this.http.get(apiUrl).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res && res.companyId) {
          sessionStorage.setItem('user', JSON.stringify(res));
          this.successMsg = 'You have successfully logged in!';
          this.errorMsg = null;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.errorMsg = 'The login details are incorrect.';
          this.successMsg = null;
        }
      },
      // error: (err) => {
      //   this.loading = false;
      //   console.error(err);
      //   this.errorMsg = 'Unable to connect to the server at the moment. Please try again later.';
      //   this.successMsg = null;
      // }
    });
  }
}
