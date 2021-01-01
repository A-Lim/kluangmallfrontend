import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, concat, zip } from 'rxjs';
import { concatMap, first, map, mergeMap, take, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import Utils from 'app/shared/helpers/utils';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Announcement } from 'app/modules/announcements/models/announcement.model';
import { AnnouncementVm } from 'app/modules/announcements/models/announcement.model.vm';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private announcementUrl = `${environment.apiUrl}/api/${environment.apiVersion}/announcements`;

  private pendingCountBS = new BehaviorSubject<number>(0);
  public readonly pendingCount$ = this.pendingCountBS.asObservable();

  constructor(private http: HttpClient) {
  }

  getPendingCount() {
    return this.http.get<ResponseResult<number>>(`${this.announcementUrl}/pending`)
      .pipe(tap(response => this.pendingCountBS.next(response.data)));
  }

  createAnnouncement(announcementVm: AnnouncementVm) {
    const formData = new FormData();
    Utils.appendFormData(formData, announcementVm, '');
    
    // combine two streams into 1
    // return first result
    return zip(
      this.http.post<ResponseResult<AnnouncementVm>>(this.announcementUrl, formData),
      this.getPendingCount()
    ).pipe(
      map(responses => responses[0]),
      // unsubscribe after first emit
      first()
    );
  }

  getAnnouncement(id: number) {
    return this.http.get<ResponseResult<Announcement>>(`${this.announcementUrl}/${id}`);
  }

  getAnnouncements(qParams: any) {
    // combine two streams into 1
    // return first result
    return zip(
      this.http.get<ResponseResult<PaginationResponse<Announcement>>>(this.announcementUrl, { params: qParams }),
      this.getPendingCount()
    ).pipe(
      map(responses => responses[0]),
      // unsubscribe after first emit
      first()
    );
  }

  deleteAnnouncement(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.announcementUrl}/${id}`);
  }

  editAnnouncement(id: number, announcementVm: AnnouncementVm) {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    Utils.appendFormData(formData, announcementVm, '');
    
    // combine two streams into 1
    // return first result
    return zip(
      this.http.post<ResponseResult<AnnouncementVm>>(`${this.announcementUrl}/${id}`, formData),
      this.getPendingCount()
    ).pipe(
      map(responses => responses[0]),
      // unsubscribe after first emit
      first()
    );
  }

  approve(id: number, remark: string = null) {
    const data = { remark: remark };

    // combine two streams into 1
    // return first result
    return zip(
      this.http.post<ResponseResult<PaginationResponse<Announcement>>>(`${this.announcementUrl}/${id}/approve`, data),
      this.getPendingCount()
    ).pipe(
      map(responses => responses[0]),
      // unsubscribe after first emit
      first()
    );
  }

  reject(id: number, remark: string = null) {
    const data = { remark: remark };
    // combine two streams into 1
    // return first result
    return zip(
      this.http.post<ResponseResult<PaginationResponse<Announcement>>>(`${this.announcementUrl}/${id}/reject`, data),
      this.getPendingCount()
    ).pipe(
      map(responses => responses[0]),
      // unsubscribe after first emit
      first()
    );
  }
}