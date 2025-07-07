import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  private apiUrl : any ="https://localhost:7259/api/Credential/"
  constructor(private http: HttpClient) {
      
     }
    //  RegisterPassenger(credentialJSON:any){
    //   return this.http.post<any>(this.apiUrl + 'RegisterPassenger', credentialJSON)
    //  }
    RegisterPassenger(credentialJSON:any){
      return this.http.post<any>(this.apiUrl + 'RegisterPassenger', credentialJSON)
     }
    // RegisterPassenger(credentials: any): Observable<any> {
    //   return this.http.post(this.apiUrl, credentials, { observe: 'response' });
    // }
    //  AddUser(UserJSON: { Username: any; Password: any; })
    //  {
    //   debugger; 
    //     return this.http.post<any>(this.apiUrl + 'AddUser',UserJSON);
    //  }
}
