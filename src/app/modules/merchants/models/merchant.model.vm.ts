import { FileDetail } from 'app/shared/models/filedetail.model';

export class MerchantVm {
  id: number;
  name: string;
  status: string;
  merchant_category_id: number;
  floor: string;
  unit: string;
  description: string;
  uploadLogo: File[];
  logo: FileDetail[];
  website: string;
  email: string;
  phone: string;
  business_reg_no: string;
  terms_and_conditions: string;
  privacy_policy: string;

  constructor() {
    this.status = 'active';
    this.description = '';
    this.logo = [];
    this.uploadLogo = [];
    this.terms_and_conditions = '';
    this.privacy_policy = '';
  }
}