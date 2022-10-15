import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillServService {
  private netSalaryBehvSubj = new BehaviorSubject<number>(0);
  public netSalaryObservable$ = this.netSalaryBehvSubj.asObservable();

  constructor(private http: HttpClient) {}

  updateNetSalary(data: number) {
    this.netSalaryBehvSubj.next(data);
  }

  saveBillToBackend(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/bill', data);
  }
}
