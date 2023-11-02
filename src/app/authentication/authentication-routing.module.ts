import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { IsLoggedInGuard } from './authentication.guard';
import {OtpComponent} from './otp/otp.component';



const routes: Routes = [
  { path: '', redirectTo: 'LogIn', pathMatch: 'full' },
  { path: 'LogIn', component: LogInComponent ,  canActivate:[IsLoggedInGuard]},
  { path: 'Otp', component: OtpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
