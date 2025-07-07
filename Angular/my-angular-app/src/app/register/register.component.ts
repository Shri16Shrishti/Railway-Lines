import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RegisterserviceService } from '../registerservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],

  templateUrl: './register.component.html'
})
export class RegisterComponent {
  userName: string = '';
  // fullName: string = '';
  password: string = '';
  // cnfpassword: string = '';
  // email: string = '';
  // mobNo: string = '';
  constructor(private service: RegisterserviceService, private router: Router) {
  }

  register() {
    debugger;

    const credentials = {
      userName: this.userName,
      // fullName: this.fullName,
      password: this.password,
      // cnfpassword: this.cnfpassword,
      // email: this.email,
      // mobNo: this.mobNo
    };

    console.log('Sending credentials:', credentials);

    // this.service.RegisterPassenger(credentials).subscribe({
    //     next: (response: HttpResponse<any>) => {
    //     console.log('Full Response:', response);
    //     debugger;

    //       if (response.toString() == 'true') {
    //       alert('Registered successfully!');
    //       this.router.navigate(['/home']);
    //     } 
    //   },
    //   error: (err: any) => {
    //     console.error('API Error:', err);
    //     alert('Something went wrong.');
    //   }
    // });
    this.service.RegisterPassenger(credentials).subscribe({
      next: (response: HttpResponse<any>) => {
        const body = response.body;
        console.log('API response:', body);
    
        // if (body?.success) {
        //   alert(body.message); 
        //   this.router.navigate(['/home']);
        // } 
        // else {
          alert('Registration Successfull. Please try again.');
          this.userName = '';
          this.password = '';
         
        // }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        alert('User Already Exists.');
        this.userName = '';
        this.password = '';
      }
    });
    
    
  }

}
