import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Promotion } from 'app/modules/promotions/models/promotion.model';
import { PromotionVm } from 'app/modules/promotions/models/promotion.model.vm';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private promotionUrl = `${environment.apiUrl}/api/${environment.apiVersion}/promotions`;

  constructor(private http: HttpClient) {
  }

  getPromotions(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Promotion>>>(this.promotionUrl, { params: qParams });
  }

  getPromotion(id: number) {
    return this.http.get<ResponseResult<Promotion>>(`${this.promotionUrl}/${id}`);
  }

  createPromotion(promotionVm: PromotionVm) {
    var formData = new FormData();
    this.appendFormData(formData, promotionVm, '');
    return this.http.post<ResponseResult<Promotion>>(`${this.promotionUrl}`, formData);
  }

  updatePromotion(id: number, promotionVm: PromotionVm) {
    var formData = new FormData();
    formData.append('_method', 'PATCH');
    this.appendFormData(formData, promotionVm, '');
    return this.http.post<ResponseResult<Promotion>>(`${this.promotionUrl}/${id}`, formData);
  }

  deletePromotion(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.promotionUrl}/${id}`);
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