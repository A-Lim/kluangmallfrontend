import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';


@Injectable({ providedIn: 'root' })
export class ReceiptService {
  private receiptsUrl = `${environment.apiUrl}/api/${environment.apiVersion}/receipts`;

  constructor(private http: HttpClient) {
  }

  getReceipts(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<any>>>(`${this.receiptsUrl}`, { params: qParams });
  }
}