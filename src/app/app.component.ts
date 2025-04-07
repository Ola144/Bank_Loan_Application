import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUser, RegisterCustomer } from './model/BankLoan';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loggedUserData!: IUser;
  router: Router = inject(Router);
  masterService: MasterService = inject(MasterService);

  ngOnInit() {
    try {
      const loggedData = sessionStorage.getItem('bankUser');
      if (loggedData != null) {
        this.loggedUserData = JSON.parse(loggedData);
      }
    } finally {
    }

    // SUBJECT 3. Read in the app component
    this.masterService.onLogin$.subscribe((res) => {
      this.masterService.readLoggedData();
    });
  }

  onLogout() {
    try {
      sessionStorage.removeItem('bankUser');
    } finally {
    }
    this.router.navigateByUrl('login');
    // this.masterService.onLogin$.next(false);
    this.masterService.loggedUserData = undefined;
  }
}
