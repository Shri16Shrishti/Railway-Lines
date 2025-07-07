import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminHistoryService } from '../admin-history.service';

@Component({
  selector: 'app-admin-history',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.css'
})
export class AdminHistoryComponent {
  AllBooking: any[] = []; 
  selectedTrain: any;
  userName: string = '';
userBookings: any[] = [];
showNoData: boolean = false;

  constructor(private service: AdminHistoryService){}
  // fetchBookingsByUser(item: any) { 
    
  //   this.selectedTrain = item;
  //   this.showModal = true;
  //   return true;
  // }

  fetchBookingsByUser() {
    if (!this.userName.trim()) {
      alert('Please enter a username');
      return;
    }
  
    this.service.GetBookingsByUsername(this.userName).subscribe({
      next: (res) => {
        this.userBookings = res;
        this.showNoData = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.userBookings = [];
        this.showNoData = true;
      }
    });
  }

  // showModal: boolean = false;
  // GetBookingsByUsername() {
  //   this.service.GetBookingsByUsername().subscribe(data => {
  //     console.log("API Data:", data); 
  //     this.AllBooking = data;
      
  //   });
  // }
}
