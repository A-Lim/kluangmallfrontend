import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

import { environment } from 'environments/environment';
import { Base } from 'app/shared/components/base.component';
import { AnnouncementService } from 'app/modules/announcements/announcements.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends Base implements OnInit, OnDestroy {
  public menuIsOpened: boolean = true;
  public isHoverOver: boolean = false;

  public appLongName: string = environment.longName;
  public landingModules = ['landing-user', 'landing-merchant', 'banners', 'events', 'promotions'];
  public isLanding: boolean = false;

  public pendingCount: number = 0;
  // public pendingCount$: Observable<number>;

  constructor(private renderer: Renderer2,
    private announcementSvc: AnnouncementService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.updateSideMenuState();

    const url = this.router.url;
    const segments = url.split('/');
    
    // if segment is listed in landingModules
    this.isLanding = segments.length > 1 ? 
      this.landingModules.includes(segments[2]) : 
      false;

    this.checkIsLanding();

    // get pending announcements
    this.announcementSvc
      .getPendingCount()
      .subscribe(response => this.pendingCount = response.data);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onLandingClicked($event: Event) {
    $event.preventDefault();
    this.isLanding = !this.isLanding;
  }

  toggleMenu() {
    this.menuIsOpened = !this.menuIsOpened;
    this.updateSideMenuState();
  }

  onMouseEnter() {
    if (this.menuIsOpened)
      return;
    
    this.isHoverOver = true;
  }

  onMouseLeave() {
    if (this.menuIsOpened)
      return;
    this.isHoverOver = false;
  }

  updateSideMenuState() {
    if (this.menuIsOpened) {
      this.renderer.removeClass(document.body, 'menu-collapsed');
      this.renderer.addClass(document.body, 'menu-expanded');
    } else {
      this.renderer.removeClass(document.body, 'menu-expanded');
      this.renderer.addClass(document.body, 'menu-collapsed');
    }
  }

  private checkIsLanding() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      const url = (event as NavigationEnd).url;
      const segments = url.split('/');
      
      // if segment is listed in landingModules
      this.isLanding = segments.length > 1 ? 
        this.landingModules.includes(segments[2]) : 
        false;
    });
  }
}
