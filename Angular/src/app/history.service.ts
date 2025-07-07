import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = "https://localhost:7259/api/Booking/"; 

  constructor(private http: HttpClient) { }
  

  // GetBookingsByUsername(userName: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?username=${userName}`);
  // }
  GetBookingsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7259/api/Booking/GetBookingsByUsername?username=${username}`);
  }
  }
  // GetBookingsByUsername(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/GetBookingsByUsername`);
  // }


