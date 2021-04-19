import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { AnnouncementVm } from 'app/modules/announcements/models/announcement.model.vm';
import { AnnouncementService } from 'app/modules/announcements/announcements.service';


@Component({
  selector: 'announcements-create',
  templateUrl: './announcements-create.component.html',
  styleUrls: ['./announcements-create.component.css']
})
export class AnnouncementsCreateComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  announcementVm: AnnouncementVm;

  constructor(private announcementSvc: AnnouncementService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Announcement');
    this.announcementVm = new AnnouncementVm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onHasContentChange(hasContent: boolean) {
    if (!hasContent) {
      this.announcementVm.image = null;
      this.announcementVm.content = '';
    }
  }

  onPublishNowChange(publishNow: boolean) {
    if (publishNow)
      this.announcementVm.publish_at = null;
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;

    const obs = this.announcementVm.publish_now ?
      this.swalConfirm('Confirm', 'Announcement cannot be recalled once it\'s published. Proceed?', 'warning', 'Ok') : 
      of(true);
    
    obs.pipe(
      tap(isConfirmed => { if (!isConfirmed) this.isLoading = false }),
      filter(isConfirmed => isConfirmed),
      switchMap(_ => this.announcementSvc.createAnnouncement(this.announcementVm)),
      switchMap(response => this.swalAlert('Success', response.message, 'success'))
    )
    .subscribe(_ => {
      this.isLoading = false;
      this.router.navigate(['admin/announcements']);
    }, _ => { this.isLoading = false; });
  }
}