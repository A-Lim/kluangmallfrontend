import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { UpdatePointsVm } from 'app/modules/users/models/updatepoints.model.vm';
import { PointService } from '../../points.service';

@Component({
  selector: 'modal-user-update-points',
  templateUrl: './modal-user-update-points.component.html',
  styleUrls: ['./modal-user-update-points.component.css']
})
export class UserUpdatePointsModalComponent extends Base implements OnInit {
  @ViewChild('form')
  form: NgForm;

  type: string;
  updatePointsVm: UpdatePointsVm;

  constructor(private pointSvc: PointService,
    private ref: CustomOverlayRef<number, { user_id: number, type: 'add' | 'deduct' }>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.type = this.ref.data.type;

    this.updatePointsVm = {
      user_id: this.ref.data.user_id,
      type: this.ref.data.type,
      amount: 0,
      description: ''
    };
  }

  close() {
    this.ref.close();
  }

  onSubmit() {
    let points = 0;
    this.submitted = true;

    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.pointSvc.addDeductPoints(this.updatePointsVm)
      .pipe(
        tap(response => points = response.data.points),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.ref.save(points);
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }
}