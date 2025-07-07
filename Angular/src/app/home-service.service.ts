import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  private apiUrl : any ='https://localhost:7259/api/Values'
  constructor(private http: HttpClient) {}

  // getData(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl + 'getData');
  // }
  getTrainsByRoute(source: string, destination: string): Observable<any[]> {
    const url = `${this.apiUrl}/GetTrainsByRoute?sourceStation=${source}&destinationStation=${destination}`;
    return this.http.get<any[]>(url);
  }
  // getTrainsByRoute(sourceStation: string, destinationStation: string) {
  //   const params = new HttpParams()
  //     .set('sourceStation', sourceStation)
  //     .set('destinationStation', destinationStation);

  //   return this.http.get<any[]>(this.apiUrl + 'GetTrainsByRoute', { params });
  // }
}
