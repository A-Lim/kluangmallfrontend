import { FileDetail } from 'app/shared/models/filedetail.model';

export class EventVm {
  title: string;
  category: string;
  status: string;
  fromDate: string;
  toDate: string;
  caption: string;
  content: string;
  thumbnail: FileDetail[];
  uploadThumbnail: File;
  images: FileDetail[];
  uploadImages: File[];
  externalLink: string;

  constructor() {
    this.title = '';
    this.status = 'active';
    this.content = '';
    this.thumbnail = [];
    this.images = [];
  }
}