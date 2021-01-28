import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/modules/dashboard/dashboard.service';
import { MerchantVisitStat } from 'app/modules/dashboard/models/merchantvisitstat.model';

@Component({
  selector: 'widget-top-merchant-visits',
  templateUrl: './widget-top-merchant-visits.component.html',
  styleUrls: ['./widget-top-merchant-visits.component.css']
})
export class WidgetTopMerchantVisitsComponent implements OnInit {

  isLoading: boolean = false;
  merchantVisitStats: MerchantVisitStat[];
  
  constructor(private dashboardSvc: DashboardService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getTopMerchantVisitsStats();
  }

  getTopMerchantVisitsStats() {
    this.isLoading = true;
    this.dashboardSvc.getTopMerchantVisits()
      .subscribe(response => {
        this.isLoading = false;
        this.merchantVisitStats = response.data;
      });
  }
}
