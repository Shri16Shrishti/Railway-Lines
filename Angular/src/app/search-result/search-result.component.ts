import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeServiceService } from '../home-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrainDetailComponent } from '../train-detail/train-detail.component';
import { BookingService } from '../booking.service';
import { TrainServiceService } from '../train-service.service';

@Component({
  selector: 'app-search-result',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']

})
export class SearchResultComponent implements OnInit {
  trains: any[] = [];
  bookingDate: string = '';
  bookingTime: string = '';
  timestampSet: boolean = false;
  name: string = '';
  randomValue: string = '';
  age: any;
  bookingId: string = '';
  journeyDate: string = '';
  currentTrain :any = [];
  dataList: any[] = [];
  selectedTrain: any;

  onAgeInput() {
    const now = new Date();
    this.bookingDate = now.toISOString().split('T')[0];     
    this.bookingTime = now.toTimeString().split(' ')[0];     
  }

  constructor(private service: TrainServiceService,private bookingService: BookingService ,private router: Router, private route: ActivatedRoute) {
    const nav = this.router.getCurrentNavigation();
    this.trains = nav?.extras?.state?.['trains'] || [];
    this.generateRandomCode(); 
  }
  generateRandomCode(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.randomValue = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }
  // goToTrainDetails(train: any) {
  //   this.router.navigate(['/train-detail'], {
  //     queryParams: {
  //       id: train.id, 
  //     }
  //   });
  // }
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
  ngOnInit(): void {
    // this.GetAllTrainDetails();

    this.route.queryParams.subscribe(params => {
      const trainId = params['id'];
      console.log('Train ID:', trainId);
    });
  }
  // GetAllTrainDetails() {
  //   this.service.GetAllTrainDetails().subscribe(data => {
  //     console.log("API Data:", data);
  //     this.trains = data;
  //   });
  // }
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
            // if (this.trains) {
            //   this.trains = this.trains.map(train =>
            //     train.trainId === updatedTrain.trainId
            //       ? { ...train, availableSeats: updatedTrain.availableSeats }
            //       : train
            //   );
            // }
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