import { Component, OnInit } from '@angular/core';
import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Dashboard');
  }
}
