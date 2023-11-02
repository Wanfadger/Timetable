import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './log-in/log-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    LogInComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgOtpInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule, MatProgressBarModule, ReactiveFormsModule, MatButtonModule, MatInputModule
  ]
})
export class AuthenticationModule { }
