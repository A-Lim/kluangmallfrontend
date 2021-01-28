import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Voucher } from 'app/modules/vouchers/models/voucher.model';
import { VoucherVm } from 'app/modules/vouchers/models/voucher.model.vm';
import Utils from 'app/shared/helpers/utils';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private voucherUrl = `${environment.apiUrl}/api/${environment.apiVersion}/vouchers`;

  constructor(private http: HttpClient) {
  }

  getVoucher(id: number) {
    return this.http.get<ResponseResult<Voucher>>(`${this.voucherUrl}/${id}`);
  }

  getVouchers(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Voucher>>>(`${this.voucherUrl}`, { params: qParams });
  }

  getVoucherTransactions(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Voucher>>>(`${this.voucherUrl}/transactions`, { params: qParams });
  }

  createVoucher(voucherVm: VoucherVm) {
    const formData = new FormData();
    Utils.appendFormData(formData, voucherVm, '');
    return this.http.post<ResponseResult<boolean>>(`${this.voucherUrl}`, formData); 
  }

  updateVoucher(id: number, voucherVm: VoucherVm) {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    Utils.appendFormData(formData, voucherVm, '');
    return this.http.post<ResponseResult<boolean>>(`${this.voucherUrl}/${id}`, formData); 
  }

  deleteVoucher(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.voucherUrl}/${id}`);
  }
}