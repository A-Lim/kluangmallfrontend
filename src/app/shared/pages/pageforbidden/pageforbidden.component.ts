import { Component, OnInit, OnDestroy } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-pageforbidden',
  templateUrl: './pageforbidden.component.html',
  styleUrls: ['./pageforbidden.component.css']
})
export class PageForbiddenComponent extends Base implements OnInit, OnDestroy {

  isAuthenticated: boolean;

  constructor(private authSvc: AuthService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Unauthorized');
    this.isAuthenticated = this.authSvc.isAuthenticated();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
