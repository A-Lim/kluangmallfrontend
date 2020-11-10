import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/modules/users/models/user.model';
import { UserVm } from 'app/modules/users/models/user.model.vm';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/${environment.apiVersion}`;
  private userUrl = `${this.baseUrl}/users`;
  private profileUrl = `${this.baseUrl}/profile`;

  constructor(private http: HttpClient) {
  }

  /****** Users ******/
  getUsers(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.userUrl}`, { params: qParams });
  }

  getUser(id: number) {
    return this.http.get<ResponseResult<User>>(`${this.userUrl}/${id}`);
  }

  createUser() {

  }

  updateUser(id: number, userVm: UserVm) {
    return this.http.patch<ResponseResult<User>>(`${this.userUrl}/${id}`, userVm);
  }

  updateUserAvatar(id: number, file: File) {
    var formData = new FormData();
    formData.append('avatar', file);
    formData.append('_method', 'PATCH');
    return this.http.post<ResponseResult<string>>(`${this.userUrl}/${id}/avatar`, formData);
  }

  resetUserPassword(id: number) {
    return this.http.post<ResponseResult<string>>(`${this.userUrl}/${id}/reset-password`, null);
  }
}