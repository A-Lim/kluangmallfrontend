import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { UpdatePointsVm } from 'app/modules/users/models/updatepoints.model.vm';


@Injectable({ providedIn: 'root' })
export class PointService {
  private pointsUrl = `${environment.apiUrl}/api/${environment.apiVersion}/points`;

  constructor(private http: HttpClient) {
  }

  getPointTransactions(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<any>>>(`${this.pointsUrl}`, { params: qParams });
  }

  addDeductPoints(data: UpdatePointsVm) {
    return this.http.post<ResponseResult<{ points: number }>>(`${this.pointsUrl}`, data);
  }
}