import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BankerListComponent } from './pages/banker-list/banker-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { LoanApplicationListComponent } from './pages/loan-application-list/loan-application-list.component';
import { NewLoanFormComponent } from './pages/new-loan-form/new-loan-form.component';
import { bankLoanGuard } from './guards/bank-loan.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'bankerList',
    component: BankerListComponent,
    canActivate: [bankLoanGuard],
  },
  {
    path: 'customerList',
    component: CustomerListComponent,
    canActivate: [bankLoanGuard],
  },
  {
    path: 'application-list',
    component: LoanApplicationListComponent,
    canActivate: [bankLoanGuard],
  },
  {
    path: 'new-loan',
    component: NewLoanFormComponent,
    canActivate: [bankLoanGuard],
  },
];
