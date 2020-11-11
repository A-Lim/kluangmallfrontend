import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Banner } from 'app/modules/banners/models/banner.model';

@Injectable({ providedIn: 'root' })
export class BannerService {
  private bannerUrl = `${environment.apiUrl}/api/${environment.apiVersion}/banners`;

  constructor(private http: HttpClient) {
  }

  getBanners(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Banner>>>(this.bannerUrl, { params: qParams });
  }

  createBanners(files: File[]) {
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`uploadBanners[${i}]`, files[i]);
    }
    return this.http.post<ResponseResult<Banner>>(`${this.bannerUrl}`, formData);
  }

  activateBanner(id: number) {
    return this.http.post<ResponseResult<null>>(`${this.bannerUrl}/${id}/activate`, null);
  }

  deactivateBanner(id: number) {
    return this.http.post<ResponseResult<null>>(`${this.bannerUrl}/${id}/deactivate`, null);
  }

  deleteBanner(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.bannerUrl}/${id}`);
  }
}