import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Base } from 'app/shared/components/base.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { LandingService } from 'app/modules/landing/landing.service';
import { Landing } from '../models/landing.model';

@Component({
  selector: 'landing-management',
  templateUrl: './landing-management.component.html',
  styleUrls: ['./landing-management.component.css']
})
export class LandingManagementComponent extends Base implements OnInit {
  landing: Landing;

  constructor(public landingSvc: LandingService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Landing');
    this.landingSvc.getLanding()
      .subscribe(response => this.landing = response.data);
  }

  
}