import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import {SettingsRoutingModule} from './settings-routing.module';
import {SharedModule} from './../shared/shared.module';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
