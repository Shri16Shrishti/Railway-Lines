import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userName'); 
    this.router.navigate(['/login']);   
    // location.reload();  
  }

  // isLoading = false;
  // bookingDetails: any;
  // http: any;
  // errorMessage = '';
  
  // GetAllBookingDetails(event: Event, bookingId: number) {
  //   event.preventDefault();
  //   this.isLoading = true;
  //   this.bookingDetails = null;
  
  //   this.http.get(`https://api/Booking/GetAllBookingDetails/${bookingId}`)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.bookingDetails = response;
  //         this.isLoading = false;
  //       },
  //       error: (err: any) => {
  //         console.error("API error", err);
  //         this.isLoading = false;
  //       }
  //     });
  // }
  
  }
