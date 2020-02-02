import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  getNames(): Observable<any> {
    return this.http.post('/api/names', { male: 0 });
  }

  getErrorRequest():Observable<any> {
    return this.http.post('/api/ss', {});
  }

}
