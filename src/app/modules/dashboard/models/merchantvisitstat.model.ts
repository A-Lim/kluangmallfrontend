import { FileDetail } from 'app/shared/models/filedetail.model';

export interface MerchantVisitStat {
  id: number;
  name: string;
  visits: number;
  logo: FileDetail;
}