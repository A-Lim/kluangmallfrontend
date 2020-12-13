import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { ApiLog } from 'app/modules/apilogs/models/apilog.model';

@Injectable({ providedIn: 'root' })
export class ApiLogService {
  private apiLogUrl = `${environment.apiUrl}/api/${environment.apiVersion}/api-logs`;

  constructor(private http: HttpClient) {
  }

  getFeedbacks(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<ApiLog>>>(this.apiLogUrl, { params: qParams });
  }
}