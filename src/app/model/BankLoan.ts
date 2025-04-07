export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

// CLASS to post/add (register) new user
export class RegisterCustomer {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  password: string;

  constructor() {
    this.userId = 0;
    this.userName = '';
    this.emailId = '';
    this.fullName = '';
    this.password = '';
  }
}

// CLASS to post/add (login) agent/customer
export class LoginCustomer {
  userName: string;
  password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }
}

export interface ILoan {
  applicationID: number;
  fullName: string;
  applicationStatus: string;
  panCard: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  annualIncome: number;
  employmentStatus: string;
  creditScore: number;
  assets: string;
  dateApplied: string;

  Loans: Array<{
    loanID: number;
    applicationID: number;
    bankName: string;
    loanAmount: number;
    emi: number;
  }>;
  customerID: number;

  // constructor() {
  //   this.applicationID = 0;
  //   this.fullName = '';
  //   this.applicationStatus = '';
  //   this.panCard = '';
  //   this.dateOfBirth = '';
  //   this.email = '';
  //   this.phone = '';
  //   this.address = '';
  //   this.city = '';
  //   this.state = '';
  //   this.zipCode = '';
  //   this.annualIncome = 0;
  //   this.employmentStatus = '';
  //   this.creditScore = 0;
  //   this.assets = '';
  //   this.dateApplied = '';

  //   this.Loans{

  //   }
  // }
}

export interface IUser {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: string;
  password: string;
  projectName: string;
  refreshToken: any;
  refreshtokenExpiryTime: any;
}

export interface IApplicationList {
  applicationID: number;
  fullName: string;
  assignedToBankEmployee: string;
  applicationStatus: string;
  dateOfBirth: string;
  email: string;
  customerPhone: string;
  employmentStatus: string;
  dateApplied: string;
  panCard: string;
}
