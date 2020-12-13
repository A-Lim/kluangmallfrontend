import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';

import { FeedbackService } from 'app/modules/feedbacks/feedbacks.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { Feedback } from 'app/modules/feedbacks/models/feedback.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { FeedbackDetailsModalComponent } from 'app/modules/feedbacks/modals/feedback-details/modal-feedback-details.component';

@Component({
  selector: 'feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.css']
})
export class FeedbacksListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;

  constructor(public feedbackSvc: FeedbackService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Feedbacks');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Subject', 'subject', true, true),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Email', 'email', true, true),
      this.getDateColDef('Feedback Date', 'created_at'),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.feedbackSvc.getFeedbacks(params);
    }

    this.setDataSource();
  }

  showDetails(feedback: Feedback) {
    this.modalSvc.open(FeedbackDetailsModalComponent, feedback, ModalSize.Medium);
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this feedback?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.feedbackSvc.deleteFeedback(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
