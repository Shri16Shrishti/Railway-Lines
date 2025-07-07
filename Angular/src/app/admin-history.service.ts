import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoryService {
  private apiUrl = "https://localhost:7259/api/Booking"; 
  private baseUrl = "https://localhost:7259/api/Values"; 

  constructor(private http: HttpClient) { }

  // GetBookingsByUsername(): Observable<any> {
    
  //   return this.http.get<any>(this.apiUrl + 'GetBookingsByUsername')
  // }
  GetBookingsByUsername(userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetBookingsByUsername`, {
      params: { userName }
    });
  }

}
