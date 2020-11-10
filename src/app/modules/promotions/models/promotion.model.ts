import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Promotion {
  id: number;
  title: string;
  category: string;
  status: string;
  fromDate: string;
  toDate: string;
  content: string;
  thumbnail: FileDetail;
  images: FileDetail[];
  externalLink: string;
}

