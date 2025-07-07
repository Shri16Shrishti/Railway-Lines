import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  standalone: true,
})
export class BookingComponent implements OnInit {
  AllBooking: any[] = []; 
  selectedTrain: any;
  currentTrain: any = [];
  departureTime: string = '';
  arrivalTime: string = '';
  journeyDuration: string = '';
  availableSeats: string = '';
  loadAllBookings: any;
  userName: string = '';


  constructor(private service: BookingService,private router: Router) {}

  EditModalPopUp(item: any) { 
    
    this.selectedTrain = item;
    this.showModal = true;
    return true;
  }

  showModal: boolean = false;
  
  ngOnInit(): void {
    this.GetAllBookingDetails();
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      this.userName = storedUser;
    }
  }

  GetAllBookingDetails() {
    this.service.GetAllBookingDetails().subscribe(data => {
      console.log("API Data:", data); 
      this.AllBooking = data;
      
    });
  }

  deleteBooking(bookingId: string){
  if (confirm('Are you sure you want to delete this booking?')) {
  this.service.DeleteById(bookingId).subscribe({
    next: (res) => {
      console.log('Full Response', res);
      alert('Booking Deleted Successfully!');
    },
  });
  alert('Booking Deleted Successfully!');
  this.router.navigate(['/home']);
}
}
  confirmBooking() {
    const booking = {
      bookingId: String(this.selectedTrain.bookingId),
         departureTime: this.selectedTrain.departureTime,
         arrivalTime: this.selectedTrain.arrivalTime,
         journeyDuration: this.selectedTrain.journeyDuration,
         availableSeats: this.selectedTrain.availableSeats,
         name: this.selectedTrain.name,
         trainName: this.selectedTrain.trainName,
         trainType: this.selectedTrain.trainType,
         sourceStation: this.selectedTrain.sourceStation,
         destinationStation: this.selectedTrain.destinationStation,
    };

    this.service.UpdateBookingDetails(booking).subscribe({
      next: (res) => {
        console.log('Train seats updated in backend',res);
        alert(res.message || 'Booking Edited Successfully!');
      },
      error: (err) => {
        console.error('Error updating details in Booking API', err);
        if (err.status >= 400) {
          alert('Something went wrong while updating booking details');
        }
      }
    });

    this.showModal = false;

  }

}
