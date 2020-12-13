import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { User } from 'app/modules/users/models/user.model';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { MerchantUserVm } from 'app/modules/merchants/models/merchant-user.model.vm';
import { MerchantTransactionVm } from './models/merchant-transaction.model.vm';
import { MerchantTransactionResponse } from './models/merchant-transaction-response.model';

@Injectable({ providedIn: 'root' })
export class MerchantService {
  private merchantUrl = `${environment.apiUrl}/api/${environment.apiVersion}/merchants`;

  constructor(private http: HttpClient) {
  }

  getMerchants(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Merchant>>>(this.merchantUrl, { params: qParams });
  }

  getMerchantUsers(id:number, qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.merchantUrl}/${id}/users`, { params: qParams });
  }

  getMerchantCategories(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.merchantUrl}/categories`, { params: qParams });
  }

  getMerchantAccountTransactions(id: number, qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.merchantUrl}/${id}/transactions`, { params: qParams });
  }

  getMerchant(id: number) {
    return this.http.get<ResponseResult<Merchant>>(`${this.merchantUrl}/${id}`);
  }

  topUp(id: number, transaction: MerchantTransactionVm) {
    return this.http.post<ResponseResult<MerchantTransactionResponse>>(`${this.merchantUrl}/${id}/topup`, transaction);
  }

  refund(transactionId: number, transaction: MerchantTransactionVm) {
    return this.http.post<ResponseResult<MerchantTransactionResponse>>(`${this.merchantUrl}/refund/${transactionId}`, transaction);
  }

  createMerchant(merchantVm: MerchantVm) {
    var formData = new FormData();
    this.appendFormData(formData, merchantVm, '');
    return this.http.post<ResponseResult<Merchant>>(`${this.merchantUrl}`, formData);
  }

  updateMerchant(id: number, merchantVm: MerchantVm) {
    var formData = new FormData();
    formData.append('_method', 'PATCH');
    this.appendFormData(formData, merchantVm, '');
    return this.http.post<ResponseResult<Merchant>>(`${this.merchantUrl}/${id}`, formData);
  }

  addUsers(id: number, merchantUsers: MerchantUserVm[]) {
    return this.http.post<ResponseResult<null>>(`${this.merchantUrl}/${id}/users`, { users: merchantUsers });
  }

  deleteMerchantCategory(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.merchantUrl}/categories/${id}`);
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