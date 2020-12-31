import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';

import { AnnouncementService } from 'app/modules/announcements/announcements.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { Announcement } from 'app/modules/announcements/models/announcement.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { AnnouncementDetailsModalComponent } from 'app/modules/announcements/modals/announcement-details/modal-announcement-details.component';

@Component({
  selector: 'announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})
export class AnnouncementsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;

  constructor(public announcementSvc: AnnouncementService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Announcements');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Title', 'title', true, true),
      this.getColDef('Merchant', 'merchant_name', true, true),
      this.getColDef('Audience', 'audience', true, true),
      this.getDateColDef('Requested Date', 'created_at'),
      this.getStatusColDef('Status', 'status', 100, 'false', this.statusCell),
      this.getActionColDef('Action', '', 150, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.announcementSvc.getAnnouncements(params);
    }

    this.setDataSource();
  }

  showDetails(announcement: Announcement) {
    this.modalSvc.open(AnnouncementDetailsModalComponent, announcement, ModalSize.Large)
      .afterClosed$
      .pipe(filter(x => x.type == 'save'))
      .subscribe(_ => this.refreshTable());
  }

  approve(announcement: Announcement) {
    this.isLoading = true;
    this.swalConfirm('Confirm', 'Are you sure you want to approve this announcement?', 'warning', 'Approve')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.announcementSvc.approve(announcement.id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => {
        this.isLoading = false;
        this.refreshTable();
      }, _ => this.isLoading = false);
  }

  reject(announcement: Announcement) {
    this.isLoading = true;
    this.swalConfirm('Confirm', 'Are you sure you want to reject this announcement?', 'warning', 'Reject')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.announcementSvc.reject(announcement.id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => {
        this.isLoading = false;
        this.refreshTable();
      }, _ => this.isLoading = false);
  }

  // delete(id: number) {
  //   this.swalConfirm('Confirm', 'Are you sure you want to delete this announcement?', 'warning', 'Delete')
  //     .pipe(
  //       filter(isConfirmed => isConfirmed),
  //       switchMap(_ => this.announcementSvc.deleteAnnouncement(id)),
  //       switchMap(response => this.swalAlert('Success', response.message, 'success'))
  //     ).subscribe(_ => this.refreshTable());
  // }
}
