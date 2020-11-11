import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';

@Injectable({ providedIn: 'root' })
export class LandingService {
  private landingUrl = `${environment.apiUrl}/api/${environment.apiVersion}/landing`;

  constructor(private http: HttpClient) {
  }

}