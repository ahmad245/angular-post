import { NgModule } from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {SharedModule} from './../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }