import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private fileUploadUrl = `${environment.apiUrl}/api/${environment.apiVersion}/fileupload`;

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ResponseResult<string>>(`${this.fileUploadUrl}`, formData);
  }
}