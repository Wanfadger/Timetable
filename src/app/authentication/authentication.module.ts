import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './log-in/log-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogInComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    NgmaterialModule,
  ]
})
export class AuthenticationModule { }
