import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class BookTicketService {
//   ApiUrl : any = "https://localhost:7259/api/Booking/";
  

//   constructor(private _httpClient: HttpClient) { }
  
//   AddBookingDetails(BookJSON:{ TrainId: any;  CustomerId: any; BookingDate: any; BookingTime: any;  JourneyDate: any;  SourceStationId: any;  DestinationStationId: any; Class: any; SeatNumber: any; Fare: any; BookingStatus: any; })
//   {
//    debugger; 
//      return this._httpClient.post<any>(this.ApiUrl + 'AddBookingDetails',BookJSON);
//   }

//   // AddBookingDetails(BookJSON:any){
//   //   return this._httpClient.post<any>(this.ApiUrl + 'AddBookingDetails', BookJSON)
//   //  }
// }
export class BookTicketService {
  ApiUrl: string = 'https://localhost:7259/api/Booking/';

  constructor(private _httpClient: HttpClient) { }

  AddBookingDetails(bookingJSON: any) {
    return this._httpClient.post<any>(this.ApiUrl + 'AddBookingDetails', bookingJSON, { observe: 'response' });
  }
}