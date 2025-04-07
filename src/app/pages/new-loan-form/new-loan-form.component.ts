import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { APIResponseModel } from '../../model/BankLoan';

@Component({
  selector: 'app-new-loan-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-loan-form.component.html',
  styleUrl: './new-loan-form.component.css',
})
export class NewLoanFormComponent {
  masterService: MasterService = inject(MasterService);
  loanAppForm: FormGroup = new FormGroup({});

  formBuilder = inject(FormBuilder);

  constructor() {
    // Call the form on the page load.
    this.initializeForm();

    if (this.masterService.loggedUserData) {
      this.loanAppForm.controls['customerId'].setValue(
        this.masterService.loggedUserData.userId
      );
    }
  }

  initializeForm() {
    this.loanAppForm = this.formBuilder.group({
      applicationID: [0],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      panCard: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      annualIncome: [10000, [Validators.required, Validators.min(10000)]],
      employmentStatus: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      creditScore: [
        300,
        [Validators.required, Validators.min(300), Validators.max(850)],
      ],
      assets: ['', Validators.required],
      dateApplied: [new Date(), Validators.required],

      loans: this.formBuilder.array([this.createLoanGroup()]),
      // loans: new FormArray([this.createLoanGroup()]),

      customerId: [0],
    });
  }

  createLoanGroup(): FormGroup {
    return this.formBuilder.group({
      loanID: [0],
      applicationID: [0],
      bankName: ['', Validators.required],
      loanAmount: ['', Validators.required],
      emi: ['', Validators.required],
    });
  }

  get loanList(): FormArray {
    return this.loanAppForm.get('loans') as FormArray;
  }

  addNewLoan() {
    (<FormArray>this.loanAppForm.get('loans')).push(this.createLoanGroup());
    // this.loanList.push(this.createLoanGroup);
  }

  removeLoanBtn(index: number) {
    // debugger;
    const controls = <FormArray>this.loanAppForm.get('loans');
    controls.removeAt(index);
    // this.loanList.removeAt(index);
  }

  onSave() {
    debugger;
    const formValue = this.loanAppForm.value;

    this.masterService.onSaveLoan(formValue).subscribe({
      next: (res: APIResponseModel) => {
        if (res.result) {
          alert('Loan Application Created Sucessfully!');
        } else {
          alert(res.message);
        }
      },
    });
  }
}
