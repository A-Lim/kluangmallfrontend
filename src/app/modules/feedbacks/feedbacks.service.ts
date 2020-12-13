import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Feedback } from 'app/modules/feedbacks/models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private feedbackUrl = `${environment.apiUrl}/api/${environment.apiVersion}/feedbacks`;

  constructor(private http: HttpClient) {
  }

  getFeedbacks(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Feedback>>>(this.feedbackUrl, { params: qParams });
  }

  deleteFeedback(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.feedbackUrl}/${id}`);
  }
}