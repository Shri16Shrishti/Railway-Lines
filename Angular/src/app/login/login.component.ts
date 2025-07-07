import { Component, Inject } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  randomValue: string = '';
  userCaptcha: string = '';
  captchaError: boolean = false;
  userName: string = '';
password: string = '';

  constructor(private service: LoginService, private router: Router) {
    this.generateRandomCode();
  }


  generateRandomCode(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.randomValue = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    this.captchaError = false;
    this.userCaptcha = '';
  }

  login1(): void {
    if (this.userCaptcha === this.randomValue) {
      this.captchaError = false;
      alert('✅ Captcha matched. Proceeding with login...');
    } else {
      this.captchaError = true;
    }

  }


  isLoading: boolean = false;
  login() {
    debugger;
    // var userName = $("#userName").val();
    // var password = $("#password").val();
    // const userName = $("#userName").val();
    // const password = $("#password").val();
   
    if (!this.userName || !this.password) {
      alert('Please enter both username and password.');
      return;
    }
  
    this.isLoading = true;

      const credentials = {
        userName: this.userName,
        password: this.password
      };
    
      console.log('Sending credentials:', credentials); 
    
      this.service.ValidateCredential(credentials).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Full Response:', response);
          debugger;
      
          if (response.toString() == 'true') {
            alert('Login successful!');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', this.userName);
            // this.router.navigate(['/train-detail'])
            this.router.navigate(['/home']);
          } else {
            alert('Invalid username or password');
          }
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Something went wrong.');
        }
      });
      
    }
    



    //  var credentialJSON = {
    //   "userName": userName,
    //   "password": password,
    // }
    // this.service.ValidateCredential(credentialJSON).subscribe((data: any) =>{
    //   alert(data);
    // })
  }

