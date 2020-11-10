import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
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
    var formData = new FormData();
    this.appendFormData(formData, eventVm, '');
    return this.http.post<ResponseResult<Event>>(`${this.eventUrl}`, formData);
  }

  updateEvent(id: number, eventVm: EventVm) {
    var formData = new FormData();
    formData.append('_method', 'PATCH');
    this.appendFormData(formData, eventVm, '');
    return this.http.post<ResponseResult<Event>>(`${this.eventUrl}/${id}`, formData);
  }

  deleteEvent(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.eventUrl}/${id}`);
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