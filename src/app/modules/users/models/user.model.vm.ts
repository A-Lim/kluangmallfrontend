export class UserVm {
  name: string;
  gender: string;
  phone: string;
  date_of_birth: string;
  status: string;
  usergroups: number[];

  constructor() {
    this.name = '';
    this.status = 'active';
    this.usergroups = [];
  }
}