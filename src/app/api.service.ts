import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:8081/";

  constructor(private http: HttpClient) {
   
   }

   post(api:String, data:any){
      const headers = {'Content-type': 'application/json'};
      const body = JSON.stringify(data);
      return this.http.post(this.baseurl + api, body, {'headers': headers});
    
    }
  

}
