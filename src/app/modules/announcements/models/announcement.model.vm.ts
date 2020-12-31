import { FileDetail } from 'app/shared/models/filedetail.model';

export class AnnouncementVm {
  title: string;
  description: string;
  status: string = 'published';
  audience: string = 'all';
  
  has_content: boolean = false;
  content: string = '';
  image: FileDetail;
  uploadImage: File[];
  remark: string;
}