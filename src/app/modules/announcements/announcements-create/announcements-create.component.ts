import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  Editor = ClassicEditor;
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

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    this.announcementSvc.createAnnouncement(this.announcementVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/announcements']);
      }, _ => { this.isLoading = false; });
  }
}