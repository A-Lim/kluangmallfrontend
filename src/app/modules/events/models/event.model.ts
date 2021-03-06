import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Event {
  id: number;
  title: string;
  category: string;
  status: string;
  fromDate: string;
  toDate: string;
  caption: string;
  content: string;
  thumbnail: FileDetail;
  images: FileDetail[];
  externalLink: string;
}

