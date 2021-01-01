import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AnnouncementsRoutingModule } from 'app/modules/announcements/announcements.routing';
import { AnnouncementsListComponent } from 'app/modules/announcements/announcements-list/announcements-list.component';
import { AnnouncementsCreateComponent } from 'app/modules/announcements/announcements-create/announcements-create.component';
import { AnnouncementsEditComponent } from 'app/modules/announcements/announcements-edit/announcements-edit.component';
import { AnnouncementDetailsModalComponent } from 'app/modules/announcements/modals/announcement-details/modal-announcement-details.component';

@NgModule({
  declarations: [
    AnnouncementsListComponent,
    AnnouncementsCreateComponent,
    AnnouncementsEditComponent,
    AnnouncementDetailsModalComponent
  ],
  imports: [
    AnnouncementsRoutingModule,
    SharedModule,
  ],
})
export class AnnouncementsModule { }
