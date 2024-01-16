import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

otpControl:FormControl = new FormControl("" , Validators.min(5))
private _authService:AuthenticationService = inject(AuthenticationService)
private _router:Router = inject(Router)
private _location:Location = inject(Location)
private toastrService: ToastrService = inject(ToastrService);

isLoading:boolean = false

ngOnInit(): void {
  if(!Object.keys(this._location.getState() as {}).includes("username")){
    this._router.navigate(['']);
  }
}



verifyOpt(){
  const dto:{username:string , code:number} = {username:(this._location.getState() as {username:string}).username , code:this.otpControl.value}

  this.isLoading = true
   const _$:Subscription =   this._authService.verifyLoginOtp(dto).subscribe({
      next:_response =>{
        this.isLoading = false
        this._router.navigate(['/Management']);
      },
      error:(errorRes:HttpErrorResponse) => {
        this.isLoading = false
        console.log(errorRes)
        this.toastrService.warning(errorRes.error.error.message)
      },
      complete:() => _$.unsubscribe()
     })
}





resetOpt(){
  this.isLoading = true
  this.otpControl.reset()
  const email = (this._location.getState() as {username:string}).username
   const _$:Subscription =   this._authService.resetOtp(email).subscribe({
      next:response =>{
        this.isLoading = false
        this.toastrService.success(response.message)
        console.log(response)
      },
      error:(errorRes:HttpErrorResponse) => {
        this.isLoading = false
        console.log(errorRes)
        this.toastrService.warning(errorRes.error.error.message)
      },
      complete:() => _$.unsubscribe()
     })
}

}
