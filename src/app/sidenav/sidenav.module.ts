import { SidenavComponent } from './sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule , NgmaterialModule,  ReactiveFormsModule,
    SidenavRoutingModule
  ]
})
export class SidenavModule { }
