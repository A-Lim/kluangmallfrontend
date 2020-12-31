import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { Announcement } from 'app/modules/announcements/models/announcement.model';
import { AnnouncementService } from 'app/modules/announcements/announcements.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'modal-announcement-details',
  templateUrl: './modal-announcement-details.component.html',
  styleUrls: ['./modal-announcement-details.component.css']
})
export class AnnouncementDetailsModalComponent extends Base implements OnInit {

  Editor = ClassicEditor;
  announcement: Announcement;
  isApproveReqLoading: boolean = false;
  isRejectReqLoading: boolean = false;

  constructor(private ref: CustomOverlayRef<null, Announcement>,
    private announcementSvc: AnnouncementService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.announcement = this.ref.data;
  }

  approve() {
    this.isLoading = true;
    this.isApproveReqLoading = true;

    this.announcementSvc.approve(this.announcement.id, this.announcement.remark)
      .pipe(
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.isApproveReqLoading = false;
        this.ref.save();
      }, error => {
        this.isLoading = false;
        this.isApproveReqLoading = false;
      });
  }

  reject() {
    if (this.announcement.remark == null || this.announcement.remark == '')
      this.swalAlert('Error', 'Please provide a remark for reject action.', 'error');

    this.isLoading = true;
    this.isRejectReqLoading = true;
    
    this.announcementSvc.reject(this.announcement.id, this.announcement.remark)
      .pipe(
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.isRejectReqLoading = false;
        this.ref.save();
      }, error => {
        this.isLoading = false;
        this.isRejectReqLoading = false;
      });
  }

  close() {
    this.ref.close();
  }
}