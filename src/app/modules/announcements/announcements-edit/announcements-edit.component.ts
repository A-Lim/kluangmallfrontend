import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { AnnouncementVm } from 'app/modules/announcements/models/announcement.model.vm';
import { AnnouncementService } from 'app/modules/announcements/announcements.service';

@Component({
  selector: 'announcements-edit',
  templateUrl: './announcements-edit.component.html',
  styleUrls: ['./announcements-edit.component.css']
})
export class AnnouncementsEditComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  Editor = ClassicEditor;
  id: number;
  disabled: boolean = false;
  announcementVm: AnnouncementVm;

  constructor(private announcementSvc: AnnouncementService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit Announcement');
    this.announcementVm = new AnnouncementVm();

    this.loadAnnouncement();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadAnnouncement() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.announcementSvc.getAnnouncement(this.id)
      .subscribe(response => {
        this.disabled = response.data.status == 'published';

        this.announcementVm = <AnnouncementVm> {
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          audience: response.data.audience,
          has_content: response.data.has_content,
          content: response.data.content,
          image: response.data.image != null ? [response.data.image] : [],
          uploadImage: null,
          remark: response.data.remark
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
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
    
    this.announcementSvc.editAnnouncement(this.id, this.announcementVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/announcements']);
      }, _ => { this.isLoading = false; });
  }
}