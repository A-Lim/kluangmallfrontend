import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Voucher {
  id: number;
  status: string;
  name: string;
  description: string;
  merchants: MerchantBasic[];
  image: FileDetail;
  qr: FileDetail;
  points: string;
  fromDate: string;
  toDate: string;
  terms_and_conditions: string;
  has_redemption_limit: boolean;
  limits: VoucherLimit[];
  
}

export interface VoucherLimit {
  type: string;
  value: number;
}

export interface MerchantBasic {
  id: number;
  name: string;
}