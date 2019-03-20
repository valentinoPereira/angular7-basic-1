import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLoginId(id: string): void {
    localStorage.setItem('loginid', id);
  }

  getLoginId() {
    return localStorage.getItem('loginid');
  }

  destroyLoginId() {
    localStorage.removeItem('loginid');
  }
}

