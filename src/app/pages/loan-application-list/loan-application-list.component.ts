import { Component, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResponseModel, IApplicationList } from '../../model/BankLoan';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loan-application-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css',
})
export class LoanApplicationListComponent {
  masterService: MasterService = inject(MasterService);
  applicationList: IApplicationList[] = [];

  constructor() {
    // if (this.masterService.loggedUserData.role == 'Customer') {
    //   this.getCustomerApplication();
    // } else {
    //   this.getAssignedApplication();
    // }
  }

  getCustomerApplication() {
    this.masterService
      .getMyApplications(this.masterService.loggedUserData.userId)
      .subscribe({
        next: (res: APIResponseModel) => {
          this.applicationList = res.data;
        },
      });
  }

  getAssignedApplication() {
    this.masterService
      .getApplicationAssigned(this.masterService.loggedUserData.userId)
      .subscribe({
        next: (res: APIResponseModel) => {
          this.applicationList = res.data;
        },
      });
  }

  setStatus(event: any, panNo: string) {
    this.masterService.changeStatus(panNo, event.target.value).subscribe({
      next: (res: APIResponseModel) => {
        if (res.result) {
          alert('Status changed!');
        } else {
          alert(res.message);
        }
        // this.applicationList = res.data;
      },
    });
  }
}