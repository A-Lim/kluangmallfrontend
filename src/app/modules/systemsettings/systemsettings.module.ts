import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SystemSettingsRoutingModule } from './systemsettings.routing';
import { SystemSettingsComponent } from 'app/modules/systemsettings/systemsettings.component';
import { SystemSettingsGeneralTabComponent } from 'app/modules/systemsettings/systemsettings-general-tab/systemsettings-general-tab.component';
import { SystemSettingsAuthTabComponent } from 'app/modules/systemsettings/systemsettings-auth-tab/systemsettings-auth-tab.component';
import { SystemSettingsSocialTabComponent } from 'app/modules/systemsettings/systemsettings-social-tab/systemsettings-social-tab.component';

@NgModule({
  declarations: [
    SystemSettingsComponent,
    SystemSettingsGeneralTabComponent,
    SystemSettingsAuthTabComponent,
    SystemSettingsSocialTabComponent,
  ],
  imports: [
    SystemSettingsRoutingModule,
    SharedModule,
  ],
})
export class SystemSettingsModule { }
