
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BookTicketService } from '../book-ticket.service';

@Component({
  selector: 'app-book-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
// export class BookTicketComponent implements OnInit {
//   ngOnInit(): void { }
//   constructor(private service: BookTicketService) { }
//   trainId: string = '';
//   customerId: string = '';
//   bookingDate: string = '';
//   bookingTime: string = '';
//   journeyDate: string = '';
//   sourceStationId: string = '';
//   destinationStationId: string = '';
//   class: string = '';
//   seatNumber: string = '';
//   fare: string = '';
//   bookingStatus: string = '';

//   timestampSet: boolean = false;


//   AddBooking() {
//     debugger;

//     const bookingJSON = {
//       TrainId: this.trainId,
//       CustomerId: this.customerId,
//       BookingDate: this.bookingDate,
//       BookingTime: this.bookingTime,
//       JourneyDate: this.journeyDate,
//       SourceStationId: this.sourceStationId,
//       DestinationStationId: this.destinationStationId,
//       Class: this.class,
//       SeatNumber: this.seatNumber,
//       Fare: this.fare,
//       BookingStatus: this.bookingStatus,
//     };
//     this.service.AddBookingDetails(bookingJSON).subscribe({
//       next: (response: HttpResponse<any>) => {
//         const body = response.body;
//         console.log('API response:', body);
//       alert("Booked Successfully");

//     },
//     error: (err: any) => {
//       console.error('API Error:', err);
//       alert('Something went wrong.');
//     }
//   });

//   }

//   onCustomerIdInput() {
//     if (!this.timestampSet && this.customerId.trim() !== '') {
//       const now = new Date();
//       this.bookingDate = now.toLocaleDateString('en-CA');
//       this.bookingTime = now.toLocaleTimeString();        
//       this.timestampSet = true;
//     }
//   }
// }
export class BookTicketComponent implements OnInit {
  
  constructor(private service: BookTicketService) {}

  trainId = '';
  customerId = '';
  bookingDate = '';
  bookingTime = '';
  journeyDate = '';
  sourceStationId = '';
  destinationStationId = '';
  class = '';
  seatNumber = '';
  fare = '';
  bookingStatus = '';
  timestampSet: boolean = false;

  ngOnInit(): void {}

  onCustomerIdInput() {
    if (!this.timestampSet && this.customerId) {
      const now = new Date();
      this.bookingDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
      this.bookingTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
      this.timestampSet = true;
    }
  }

  AddBooking() {
    const bookingJSON = {
      trainId: parseInt(this.trainId),
      customerId: parseInt(this.customerId),
      bookingDate: this.bookingDate,
      bookingTime: this.bookingTime,
      journeyDate: this.journeyDate,
      sourceStationId: parseInt(this.sourceStationId),
      destinationStationId: parseInt(this.destinationStationId),
      class: this.class,
      seatNumber: this.seatNumber,
      fare: parseFloat(this.fare),
      bookingStatus: this.bookingStatus
    };

    this.service.AddBookingDetails(bookingJSON).subscribe({
      next: (res) => {
        alert('Booked Successfully');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong');
      }
    });
  }
}