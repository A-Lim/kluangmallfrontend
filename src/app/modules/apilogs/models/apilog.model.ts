export interface ApiLog {
  user_id: number;
  method: string;
  url: string;
  ip: string;
  user_agent: string;
  header: string;
  request_data: string;
  response_data: string;
  status: string;
  created_at: string;
}