import { FileDetail } from 'app/shared/models/filedetail.model';

export class VoucherVm {
  type: string = 'deduct cash';
  display_to_all: boolean = false;
  status: string = 'active';
  name: string;
  description: string = '';
  image: FileDetail[] = [];
  uploadImage: FileDetail[] = [];
  qr: FileDetail[] = [];
  uploadQr: File[] = [];
  points: string;
  free_points: string;
  fromDate: string;
  toDate: string;
  terms_and_conditions: string = '';
  has_redemption_limit: boolean = false;
  assign_to_user_now: boolean = false;
  limits: VoucherLimitVm[] = [];
}

export class VoucherLimitVm {
  type: string;
  value: number;
}