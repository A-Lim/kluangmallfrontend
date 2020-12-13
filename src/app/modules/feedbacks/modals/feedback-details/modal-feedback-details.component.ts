import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { Feedback } from 'app/modules/feedbacks/models/feedback.model';

@Component({
  selector: 'modal-feedback-details',
  templateUrl: './modal-feedback-details.component.html',
  styleUrls: ['./modal-feedback-details.component.css']
})
export class FeedbackDetailsModalComponent extends Base implements OnInit {
  
  feedback: Feedback;

  constructor(private ref: CustomOverlayRef<null, Feedback>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.feedback = this.ref.data;
  }

  close() {
    this.ref.close();
  }
}