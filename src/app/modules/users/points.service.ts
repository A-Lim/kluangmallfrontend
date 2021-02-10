import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';


@Injectable({ providedIn: 'root' })
export class PointService {
  private pointsUrl = `${environment.apiUrl}/api/${environment.apiVersion}/points`;

  constructor(private http: HttpClient) {
  }

  getPointTransactions(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<any>>>(`${this.pointsUrl}`, { params: qParams });
  }
}