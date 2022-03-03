import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
private locationurl="https://countriesnow.space/api/v0.1/countries";
private langURL =""
  constructor(private http:HttpClient) { }
  
  getlocation()
  {
    return this.http.get<any>(this.locationurl);
  }
 

}
