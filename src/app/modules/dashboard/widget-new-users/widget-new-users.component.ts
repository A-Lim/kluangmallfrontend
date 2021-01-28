import { Component, OnInit } from '@angular/core';

import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { DashboardService } from 'app/modules/dashboard/dashboard.service';

@Component({
  selector: 'widget-new-users',
  templateUrl: './widget-new-users.component.html',
  styleUrls: ['./widget-new-users.component.css']
})
export class WidgetNewUsersComponent implements OnInit {
  isLoading: boolean = false;
  filterRange: string = 'week';

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[];
  barChartData: ChartDataSets[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private dashboardSvc: DashboardService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getNewUserStats();
  }

  onFilterRangeChanged(filterRange: string) {
    this.filterRange = filterRange;
    this.getNewUserStats();
  }

  getNewUserStats() {
    this.isLoading = true;
    const filters = { range: this.filterRange };
    this.dashboardSvc.getNewUsersStats(filters)
      .subscribe(response => {
        this.isLoading = false;
        this.barChartLabels = response.data.map(x => x.date);
        this.barChartData = [{
          data: response.data.map(x => x.no_users),
          label: 'New Users'
        }];
      });
  }
}
