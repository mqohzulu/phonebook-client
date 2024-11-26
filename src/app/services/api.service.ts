import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: string;
  constructor(private http: HttpClient, @Inject('ENVIRONMENT') private environment: any) {
    console.log("environment", environment)
    this.apiURL = environment.apiUrl;
  }
}
