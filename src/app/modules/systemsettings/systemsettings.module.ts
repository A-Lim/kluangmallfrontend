import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SystemSettingsRoutingModule } from './systemsettings.routing';
import { SystemSettingsComponent } from 'app/modules/systemsettings/systemsettings.component';
import { SystemSettingsGeneralTabComponent } from 'app/modules/systemsettings/systemsettings-general-tab/systemsettings-general-tab.component';
import { SystemSettingsAuthTabComponent } from 'app/modules/systemsettings/systemsettings-auth-tab/systemsettings-auth-tab.component';
import { SystemSettingsSocialTabComponent } from 'app/modules/systemsettings/systemsettings-social-tab/systemsettings-social-tab.component';
import { SystemSettingsMobileTabComponent } from 'app/modules/systemsettings/systemsettings-mobile-tab/systemsettings-mobile-tab.component';
import { SystemSettingsCreditTabComponent } from 'app/modules/systemsettings/systemsettings-credit-tab/systemsettings-credit-tab.component';
import { SystemSettingsRedemptionTabComponent } from 'app/modules/systemsettings/systemsettings-redemption-tab/systemsettings-redemption-tab.component';

@NgModule({
  declarations: [
    SystemSettingsComponent,
    SystemSettingsGeneralTabComponent,
    SystemSettingsAuthTabComponent,
    SystemSettingsSocialTabComponent,
    SystemSettingsMobileTabComponent,
    SystemSettingsCreditTabComponent,
    SystemSettingsRedemptionTabComponent
  ],
  imports: [
    SystemSettingsRoutingModule,
    SharedModule,
  ],
})
export class SystemSettingsModule { }
