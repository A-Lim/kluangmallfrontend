import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.css']
})
export class BannersListComponent extends Base implements OnInit {

  activeTab: string = 'user';

  // tab tracking
  isUsersTabLoaded: boolean = false;
  isMerchantsTabLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Banners');

    this.activatedRoute.queryParams.subscribe(params => {
      this.activeTab = params['tab'] ?? 'user';
      switch(this.activeTab) {
        case 'user':
          this.isUsersTabLoaded = true;
          break;
        
        case 'merchant':
          this.isMerchantsTabLoaded = true;
          break;
      }
    });
  }

  onTabClick(tab: BannerListTab) {
    switch (tab) {
      case BannerListTab.Users:
        this.isUsersTabLoaded = true;
        break;
      
      case BannerListTab.Merchants:
        this.isMerchantsTabLoaded = true;
        break;

      default:
        break;
    }
  }

  get BannerListTab() {
    return BannerListTab;
  }
}

enum BannerListTab {
  Users,
  Merchants
}