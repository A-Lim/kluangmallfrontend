import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Merchant {
  id: number;
  name: string;
  status: string;
  category: string;
  location: string;
  description: string;
  logo: FileDetail;
  website: string;
  email: string;
  phone: string;
  business_reg_no: string;
  terms_and_conditions: string;
  privacy_policy: string;
}