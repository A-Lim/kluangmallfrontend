import { FileDetail } from 'app/shared/models/filedetail.model';

export class BannerVm {
  title: string;
  status: string;
  is_clickable: boolean;
  image: FileDetail[];
  uploadImage: File[];
  type: string;
  type_id: number;

  constructor() {
    this.title = '';
    this.status = 'active';
    this.is_clickable = false;
    this.uploadImage = [];
    this.image = [];
  }
}