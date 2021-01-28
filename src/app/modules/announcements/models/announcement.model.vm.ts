import { FileDetail } from 'app/shared/models/filedetail.model';

export class AnnouncementVm {
  title: string;
  description: string;
  status: string = 'approved';
  audience: string = 'all';
  publish_now: boolean = true;
  publish_at: string;
  has_content: boolean = false;
  content: string = '';
  image: FileDetail[];
  uploadImage: File;
  remark: string;
}