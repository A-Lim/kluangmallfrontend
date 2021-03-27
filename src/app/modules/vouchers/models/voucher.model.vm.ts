import { FileDetail } from 'app/shared/models/filedetail.model';

export class VoucherVm {
  status: string = 'active';
  name: string;
  description: string = '';
  image: FileDetail[] = [];
  uploadImage: FileDetail[] = [];
  qr: FileDetail[] = [];
  uploadQr: File[] = [];
  points: string;
  fromDate: string;
  toDate: string;
  terms_and_conditions: string = '';
  has_redemption_limit: boolean = false;
  limits: VoucherLimitVm[] = [];
}

export class VoucherLimitVm {
  type: string;
  value: number;
}