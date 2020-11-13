import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Landing } from 'app/modules/landing/models/landing.model';

@Injectable({ providedIn: 'root' })
export class LandingService {
  private landingUrl = `${environment.apiUrl}/api/${environment.apiVersion}/landing`;

  constructor(private http: HttpClient) {
  }

  getLanding() {
    return this.http.get<ResponseResult<Landing>>(`${this.landingUrl}`);
  }
}