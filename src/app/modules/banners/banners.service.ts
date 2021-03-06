import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Banner } from 'app/modules/banners/models/banner.model';
import { BannerVm } from 'app/modules/banners/models/banner.model.vm';

@Injectable({ providedIn: 'root' })
export class BannerService {
  private bannerUrl = `${environment.apiUrl}/api/${environment.apiVersion}/banners`;

  constructor(private http: HttpClient) {
  }

  getBanners(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Banner>>>(this.bannerUrl, { params: qParams });
  }

  getBanner(id: number) {
    return this.http.get<ResponseResult<Banner>>(`${this.bannerUrl}/${id}`);
  }

  createBanner(bannerVm: BannerVm) {
    var formData = new FormData();
    this.appendFormData(formData, bannerVm, '');
    return this.http.post<ResponseResult<Banner>>(`${this.bannerUrl}`, formData);
  }

  updateBanner(id: number, bannerVm: BannerVm) {
    var formData = new FormData();
    formData.append('_method', 'PATCH');
    this.appendFormData(formData, bannerVm, '');
    return this.http.post<ResponseResult<Banner>>(`${this.bannerUrl}/${id}`, formData);
  }

  deleteBanner(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.bannerUrl}/${id}`);
  }

  private appendFormData(formData, data, rootName) {
    let root = rootName || '';
    if (data instanceof File) {
        formData.append(root, data);
    } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            this.appendFormData(formData, data[i], root + '[' + i + ']');
        }
    } else if (typeof data === 'object' && data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (root === '') {
                    this.appendFormData(formData, data[key], key);
                } else {
                    this.appendFormData(formData, data[key], root + '[' + key + ']');
                }
            }
        }
    } else {
        if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
        }
    }
  }
}