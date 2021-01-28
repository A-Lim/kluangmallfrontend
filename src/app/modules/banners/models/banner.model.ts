import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Banner {
  id: number;
  title: string;
  app: string;
  is_clickable: boolean;
  status: string;
  image: FileDetail;
  type: string;
  type_id: number;
}

