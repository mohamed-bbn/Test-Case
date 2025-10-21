import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://erpapi.nc.sa/erp/Erp_Users/erp_login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .get<any>(`${this.baseUrl}?email=${email}&password=${password}&lang=ar`)
      .pipe(
        map((res) => {
          if (res?.companyId) {
            localStorage.setItem('user', JSON.stringify(res));
          }
          return res;
        })
      );
  }
 
}
