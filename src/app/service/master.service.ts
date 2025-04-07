import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  APIResponseModel,
  ILoan,
  IUser,
  RegisterCustomer,
} from '../model/BankLoan';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/BankLoan/';

  // Subject to read localStorage again after login
  // onLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // 1
  onLogin$: Subject<boolean> = new Subject<boolean>();

  loggedUserData!: any;

  constructor(private http: HttpClient) {
    this.readLoggedData();
  }

  readLoggedData() {
    try {
      const loggedData = sessionStorage.getItem('bankUser');
      if (loggedData != null) {
        this.loggedUserData = JSON.parse(loggedData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  onSaveLoan(obj: ILoan) {
    return this.http.post<APIResponseModel>(
      `${this.apiUrl}AddNewApplication`,
      obj
    );
  }

  getMyApplications(id: number) {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}GetMyApplications?customerId=${id}`
    );
  }

  getApplicationAssigned(id: number) {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}GetApplicationAssignedToMe?bankEmployeeId=${id}`
    );
  }

  changeStatus(panNo: string, status: string) {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}CheckApplicationStatus?panNo=${panNo}&${status}`
    );
  }
}
