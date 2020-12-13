import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { FeedbacksRoutingModule } from 'app/modules/feedbacks/feedbacks.routing';
import { FeedbacksListComponent } from 'app/modules/feedbacks/feedbacks-list/feedbacks-list.component';
import { FeedbackDetailsModalComponent } from 'app/modules/feedbacks/modals/feedback-details/modal-feedback-details.component';

@NgModule({
  declarations: [
    FeedbacksListComponent,
    FeedbackDetailsModalComponent
  ],
  imports: [
    FeedbacksRoutingModule,
    SharedModule,
  ],
})
export class FeedbacksModule { }
