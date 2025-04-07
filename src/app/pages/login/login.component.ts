import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APIResponseModel, RegisterCustomer } from '../../model/BankLoan';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'real-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('login') loginSelector!: ElementRef;
  @ViewChild('register') registerSelector!: ElementRef;
  @ViewChild('btn') btnSelector!: ElementRef;

  registerObj: RegisterCustomer = new RegisterCustomer();
  // loginObj: LoginCustomer = new LoginCustomer();

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  masterService: MasterService = inject(MasterService);

  @ViewChild('registerForm') registerForm!: NgForm;

  // loginErrorM: boolean = false;
  loginUsernameErrorM: boolean = false;
  loginPasswordErrorM: boolean = false;

  registerErrorM: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onRegisterView() {
    this.loginSelector.nativeElement.style.left = '-400px';
    this.registerSelector.nativeElement.style.left = '50px';
    this.btnSelector.nativeElement.style.left = '110px';
  }

  onLoginView() {
    this.loginSelector.nativeElement.style.left = '50px';
    this.registerSelector.nativeElement.style.left = '450px';
    this.btnSelector.nativeElement.style.left = '0px';
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerErrorM = true;
      setTimeout(() => {
        this.registerErrorM = false;
      }, 5000);
    } else {
      this.http
        .post<APIResponseModel>(
          'https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer',
          this.registerObj
        )
        .subscribe({
          next: (res: APIResponseModel) => {
            if (res.result) {
              alert('Customer Registered Successfully!');
            } else {
              alert(res.message);
            }
          },
          // error: (err: APIResponseModel) => {
          //   alert(err.message);
          // }
        });
    }
  }

  onLogin() {
    if (this.loginForm.get('userName')?.invalid) {
      this.loginUsernameErrorM = true;

      setTimeout(() => {
        this.loginUsernameErrorM = false;
      }, 5000);
    } else if (this.loginForm.get('password')?.invalid) {
      this.loginPasswordErrorM = true;

      setTimeout(() => {
        this.loginPasswordErrorM = false;
      }, 5000);
    } else {
      const formValue = this.loginForm.value;
      this.http
        .post<APIResponseModel>(
          'https://projectapi.gerasim.in/api/BankLoan/login',
          formValue
        )
        .subscribe({
          next: (res: APIResponseModel) => {
            if (res.result) {
              try {
                sessionStorage.setItem('bankUser', JSON.stringify(res.data));
              } finally {
              }

              //SUBJECT 2. Emit Some Value
              this.masterService.onLogin$.next(true);

              this.router.navigateByUrl('application-list');
            } else {
              alert(res.message);
            }
          },
          // error: (err: APIResponseModel) => {
          //   alert(err.message);
          // }
        });
    }
  }
}
