import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './log-in/log-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
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
