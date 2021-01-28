import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { NewUserStat } from 'app/modules/dashboard/models/newuserstat.model';
import { MerchantVisitStat } from 'app/modules/dashboard/models/merchantvisitstat.model';
import { GeneralStat } from './models/generalstat.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private dashboardUrl = `${environment.apiUrl}/api/${environment.apiVersion}/dashboard`;

  constructor(private http: HttpClient) {
  }

  getStats() {
    return this.http.get<ResponseResult<GeneralStat>>(`${this.dashboardUrl}/stats`);
  }

  getNewUsersStats(params: any) {
    return this.http.get<ResponseResult<NewUserStat[]>>(`${this.dashboardUrl}/newusers`, { params });
  }

  getTopMerchantVisits() {
    return this.http.get<ResponseResult<MerchantVisitStat[]>>(`${this.dashboardUrl}/top10merchantvisits`);
  }
}