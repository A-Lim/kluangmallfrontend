import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Shop {
  id: number;
  name: string;
  status: string;
  category: string;
  floor: string;
  unit: string;
  logo: FileDetail;
}