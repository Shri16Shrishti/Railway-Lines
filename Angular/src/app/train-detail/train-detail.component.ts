import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TrainServiceService } from '../train-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-train-detail',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './train-detail.component.html',
  styleUrl: './train-detail.component.css',
  standalone: true,
})

export class TrainDetailComponent implements OnInit {
  trains: any[] = [];
  bookingDate: string = '';
  bookingTime: string = '';
  timestampSet: boolean = false;
  name: string = '';
  randomValue: string = '';
  age: any;
  bookingId: string = '';
  journeyDate: string = '';
  currentTrain: any = [];
  // userName: string = '';

  onAgeInput() {
    const now = new Date();
    this.bookingDate = now.toISOString().split('T')[0];
    this.bookingTime = now.toTimeString().split(' ')[0];
  }

  constructor(private service: TrainServiceService, private bookingService: BookingService, private router: Router, private route: ActivatedRoute) {
    this.generateRandomCode();
    const nav = this.router.getCurrentNavigation();
    this.trains = nav?.extras?.state?.['trains'] || [];
  }
  dataList: any[] = [];
  selectedTrain: any;

  // generateRandomCode(): void {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   this.randomValue = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

  // }
  generateRandomCode(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.randomValue = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }


  EditModalPopUp(train: any) {
    const userName = localStorage.getItem('userName');
  
    if (!userName) {
      alert('Please Login First');
      this.router.navigate(['/login']);
      return;
    }
    
    this.selectedTrain = train;
    this.showModal = true;
    this.bookingId = this.randomValue;
    this.currentTrain = train;
  }
  showModal: boolean = false;


  closeModal() {
    this.showModal = false;
  }

  // bookTrain(item: any) {
  //   this.router.navigate(['/book-ticket'], {
  //     queryParams: { trainId: item.trainId }
  //   });
  // }
  bookTrain(train: any) {
    console.log('Train booked:', train);
    const userName = localStorage.getItem('userName');
    if (!userName) {
      alert('Please Login First');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/book-ticket']);
  }
  ngOnInit(): void {
    this.GetAllTrainDetails();

    this.route.queryParams.subscribe(params => {
      const trainId = params['id'];
      console.log('Train ID:', trainId);
    });
  }


  GetAllTrainDetails() {
    this.service.GetAllTrainDetails().subscribe(data => {
      console.log("API Data:", data);
      this.trains = data;
    });
  }
  // onBookClick(train: any) {
  //   this.selectedTrain = train;

  //   const now = new Date();
  //   this.bookingDate = now.toISOString().substring(0, 10); // Format: YYYY-MM-DD
  //   this.bookingTime = now.toTimeString().substring(0, 5); // Format: HH:MM

  //   this.showModal = true;
  // }

  closeBookingModal() {
    this.showModal = false;
  }

  confirmBooking() { 
    const userName = localStorage.getItem('userName');
    if (!userName) {
      alert('Please Login First');
      this.router.navigate(['/login']);
      return;
    }
  
    this.generateRandomCode();
    const now = new Date();
    this.bookingDate = now.toISOString().split('T')[0];
    this.bookingTime = now.toTimeString().split(' ')[0];
  
    if (!this.name || !this.age || !this.journeyDate || !this.bookingDate || !this.bookingTime || !this.bookingId) {
      alert('Asterisk marked fields are mandatory please fill them properly');
      return;
    }
  
    // Prepare booking object
    const booking = {
      trainId: this.currentTrain.trainId,
      trainName: this.currentTrain.trainName,
      trainType: this.currentTrain.trainType,
      sourceStation: this.currentTrain.sourceStation,
      destinationStation: this.currentTrain.destinationStation,
      departureTime: this.currentTrain.departureTime,
      arrivalTime: this.currentTrain.arrivalTime,
      journeyDuration: this.currentTrain.journeyDuration,
      totalSeats: this.currentTrain.totalSeats,
      availableSeats: this.currentTrain.availableSeats,
      fare: this.currentTrain.fare,
      userName: localStorage.getItem('userName'),
      name: this.name,
      age: this.age,
      journeyDate: this.journeyDate,
      bookingDate: this.bookingDate,
      bookingTime: this.bookingTime,
      bookingId: this.bookingId,
    };
    // const updatedTrain = {
    //   availableSeats: this.currentTrain.availableSeats,

    // }
  
    this.bookingService.AddBookingDetails(booking).subscribe({
      next: (res) => {
        console.log('Full Response', res);
        alert('Booked Successfully');
        
        const updatedTrain = { ...this.currentTrain };
        updatedTrain.availableSeats = this.currentTrain.availableSeats - 1;
  
        this.service.UpdateTrainDetails(updatedTrain).subscribe({
          next: (res) => {
            console.log('Train seats updated in backend',res);
            this.currentTrain.availableSeats = updatedTrain.availableSeats;
            if (this.trains) {
              this.trains = this.trains.map(train =>
                train.trainId === updatedTrain.trainId
                  ? { ...train, availableSeats: updatedTrain.availableSeats }
                  : train
              );
            }
          },
          error: (err) => {
            console.error('Error updating seats in Train API', err);
            if (err.status >= 400) {
              alert('Something went wrong while updating train seats');
            }
          }
        });
  
        this.showModal = false;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong while saving booking');
      }
    });
  
    alert('Booking Confirmed!');
    this.router.navigate(['/home']);
  }
  

}


