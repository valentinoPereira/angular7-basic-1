import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetaRequest } from '../interfaces/beta-request';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  loading: boolean;
  constructor(private http: HttpClient) {
    this.loading = false;
  }

  login(data: BetaRequest): Observable<any> {
    console.log(data);
    // return this.http.post('http://localhost:8080', data);
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  getIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org/?format=json');
  }

}
