import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';

import { DefaultModalComponent } from 'app/shared/components/modal/default.modal.component';
import { AlertComponent } from 'app/shared/components/alert/alert.component';
import { NavComponent } from 'app/shared/components/nav/nav.component';
import { FooterComponent } from 'app/shared/components/footer/footer.component';
import { SideMenuComponent } from 'app/shared/components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AccordionComponent } from './components/accordion/accordion.component';

// formcontrols
import { DatepickerComponent } from 'app/shared/components/form-control/datepicker/datepicker.component';
import { FileInputComponent } from 'app/shared/components/form-control/fileinput/fileinput.component';
import { RichTextEditorComponent } from 'app/shared/components/form-control/richtexteditor/richtexteditor.component';

import { TemplateRendererComponent } from 'app/shared/components/template-renderer.component';
import { AdminLayoutComponent } from 'app/shared/components/layouts/admin/admin.layout.component';
import { DefaultLayoutComponent } from 'app/shared/components/layouts/default.layout.component.css/default.layout.component';

// pipes
import { IsRouteActivePipe } from 'app/shared/pipes/isrouteactive.pipe';

// validators
import { IsIntegerValidator } from 'app/shared//validators/isinteger.validator';
import { MatchValueValidator } from 'app/shared//validators/matchvalue.validator';
import { RequiredIfEitherNotEmptyValidator } from 'app/shared/validators/requiredifnotempty.validator';
import { FileTypesValidator } from 'app/shared/components/form-control/fileinput/validators/filetype.validator';
import { RequiredFileInputValidator } from 'app/shared/components/form-control/fileinput/validators/required.validator';
import { DateRequiredValidator } from 'app/shared/components/form-control/datepicker/validators/daterequired.validator';

// pages
import { PageNotFoundComponent } from 'app/shared/pages/pagenotfound/pagenotfound.component';
import { PageForbiddenComponent } from './pages/pageforbidden/pageforbidden.component';

import { ForbiddenComponent } from 'app/shared/components/forbidden/forbidden.component';
import { AuthorizedContentComponent } from 'app/shared/components/authorized-content/authorized-content/authorized-content.component';

// directives

@NgModule({
  declarations: [
    AlertComponent,
    NavComponent,
    FooterComponent,
    SideMenuComponent,
    BreadCrumbComponent,
    ForbiddenComponent,
    AccordionComponent,
    AuthorizedContentComponent,

    TemplateRendererComponent,
  
    AdminLayoutComponent,
    DefaultLayoutComponent,
    DefaultModalComponent,
    PageNotFoundComponent,
    PageForbiddenComponent,

    // Pipe
    IsRouteActivePipe,

    // Validator
    FileTypesValidator,
    RequiredFileInputValidator,
    IsIntegerValidator,
    MatchValueValidator,
    RequiredIfEitherNotEmptyValidator,
    DateRequiredValidator,

    // Form Input
    FileInputComponent,
    DatepickerComponent,
    RichTextEditorComponent,
    // Directives
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    CKEditorModule,
    AngularMyDatePickerModule,
    AgGridModule.withComponents([
      TemplateRendererComponent
    ]),
    OverlayModule,
    NgSelectModule,
    AbilityModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    AlertComponent,
    NavComponent,
    FooterComponent,
    SideMenuComponent,
    BreadCrumbComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    AccordionComponent,
    AuthorizedContentComponent,

    // 3rd party
    AgGridModule,
    TemplateRendererComponent,
    NgSelectModule,
    AbilityModule,

    // form controls
    FileInputComponent,
    DatepickerComponent,
    RichTextEditorComponent,
    
    // Directives

    // Pipes
    IsRouteActivePipe,

    // Validator
    FileTypesValidator,
    RequiredFileInputValidator,
    IsIntegerValidator,
    MatchValueValidator,
    RequiredIfEitherNotEmptyValidator,
    DateRequiredValidator,

    // Directives
  ],
  providers: [
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
  ]
})
export class SharedModule { }
