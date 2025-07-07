import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = "https://localhost:7259/api/Booking/"; 
  private baseUrl = "https://localhost:7259/api/Values"; 

  constructor(private http: HttpClient) { }
  GetAllBookingDetails(): Observable<any> {
    // return this.http.get(`${this.baseUrl}/GetAllBookingDetails`);
    
    return this.http.get<any>(this.apiUrl + 'GetAllBookingDetails')
  }

  AddBookingDetails(data: any) {
    return this.http.post(this.apiUrl +'AddBookingDetails', data); 
  }
  // UpdateBookingDetails(booking: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${booking.id}`, booking);
  // }
  UpdateBookingDetails(booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl}UpdateBookingDetails`, booking);
  }
  updateTrainDetails(train: any) {
    return this.http.post(`${this.baseUrl}/UpdateTrainDetails`, train);
  }
  DeleteById(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}DeleteById?id=${bookingId}`);
  }
  
}
