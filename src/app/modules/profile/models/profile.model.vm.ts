export class ProfileVm {
  name: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  oldPassword: string;
  newPassword: string;
  newPassword_confirmation: string;

  constructor() {
    this.name = '';
  }
}