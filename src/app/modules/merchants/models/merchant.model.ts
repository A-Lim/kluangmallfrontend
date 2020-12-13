import { FileDetail } from 'app/shared/models/filedetail.model';
import { MerchantAccount } from 'app/modules/merchants/models/merchant-account.model';

export interface Merchant {
  id: number;
  name: string;
  status: string;
  category: string;
  floor: string;
  unit: string;
  description: string;
  logo: FileDetail;
  website: string;
  email: string;
  phone: string;
  business_reg_no: string;
  terms_and_conditions: string;
  privacy_policy: string;
  account: MerchantAccount;
}