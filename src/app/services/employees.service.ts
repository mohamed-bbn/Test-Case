import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  private baseUrl = 'https://erpapi.nc.sa/erp/Mangement/get_all_erp_employees_by_company_id?company_id=null';
  
    constructor(private http: HttpClient) {}
  
    getallEmployees() {
      return this.http
        .get<any>(`${this.baseUrl}`)
    }
}
