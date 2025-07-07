// src/app/history/history.component.ts

import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  historyData: any[] = [];
  AllBooking: any[] = [];
  userName: string = '';
  selectedTrain: any;
  constructor(private historyService: HistoryService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.historyData = nav?.extras?.state?.['historyData'] || [];
  }

  // ngOnInit(): void {
  //   const userName = localStorage.getItem('userName');
  //   if (userName) {
  //     this.historyService.GetBookingsByUsername(userName).subscribe(data => {
  //       this.historyData = data;
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';

    if (this.userName) {
      this.historyService.GetBookingsByUsername(this.userName).subscribe(data => {
        this.historyData = data;
      });
    } else {
      console.warn('No user logged in');
    }
  }
  // ngOnInit(): void {
  //   this.GetBookingsByUsername();
  //   const storedUser = localStorage.getItem('userName');
  //   if (storedUser) {
  //     this.userName = storedUser;
  //   }
  // }

  GetBookingsByUsername() {
    const userName = this.userName;
    this.historyService.GetBookingsByUsername(userName).subscribe(data => {
      console.log("API Data:", data); 
      this.historyData = data;
      
    });
  }
}
