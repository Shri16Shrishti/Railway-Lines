import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl : any ="https://localhost:7259/api/Credential/"
constructor(private http: HttpClient) {
    
   }
   GetAllCredentialDetails(credentialJSON:any){
    return this.http.get<any>(this.apiUrl + 'GetAllCredentialDetails', credentialJSON)
   }
   ValidateCredential(credentialJSON:any){
    return this.http.post<any>(this.apiUrl + 'ValidateCredential', credentialJSON)
   }
  // ValidateCredential(data: any): Observable<boolean> {
  //   return this.http.post<boolean>(this.apiUrl + 'ValidateCredential', data);
  // }
  
  // ValidateCredential(credentials: any) {
  //   return this.http.post(url, credentials, { observe: 'response' });
  // }
  
}
