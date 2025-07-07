import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {
  // private baseUrl  : any ="https://localhost:7259//api/Values/";
  private baseUrl = "https://localhost:7259/api/Values"; 

  constructor(private http: HttpClient) { }

  GetAllTrainDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllTrainDetails`);
  }
  UpdateTrainDetails(train: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateTrainDetails`, train);
  }
 
  // getTrainsByRoute(source: string, destination: string): Observable<any[]> {
  //   const url = `${this.baseUrl}/GetTrainsByRoute?sourceStation=${source}&destinationStation=${destination}`;
  //   return this.http.get<any[]>(url);
  // }
}
