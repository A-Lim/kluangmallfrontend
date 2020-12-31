import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import Utils from 'app/shared/helpers/utils';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { Event } from 'app/modules/events/models/event.model';
import { EventVm } from 'app/modules/events/models/event.model.vm';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventUrl = `${environment.apiUrl}/api/${environment.apiVersion}/events`;

  constructor(private http: HttpClient) {
  }

  getEvents(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Event>>>(this.eventUrl, { params: qParams });
  }

  getEvent(id: number) {
    return this.http.get<ResponseResult<Event>>(`${this.eventUrl}/${id}`);
  }

  createEvent(eventVm: EventVm) {
    const formData = new FormData();
    Utils.appendFormData(formData, eventVm, '');
    return this.http.post<ResponseResult<Event>>(`${this.eventUrl}`, formData);
  }

  updateEvent(id: number, eventVm: EventVm) {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    Utils.appendFormData(formData, eventVm, '');
    return this.http.post<ResponseResult<Event>>(`${this.eventUrl}/${id}`, formData);
  }

  deleteEvent(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.eventUrl}/${id}`);
  }
}