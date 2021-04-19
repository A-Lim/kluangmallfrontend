import { FileDetail } from 'app/shared/models/filedetail.model';

export interface Announcement {
  id: number;
  title: string;
  description: string;
  status: string;
  audience: string;
  publish_at: string;
  has_content: boolean;
  content: string;
  merchant_name: string;
  remark: string;
  image: FileDetail;
  requested_by_merchant: string;
  created_at: string;
  updated_at: string;
}