import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDto } from '../authentication.dto';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  private authService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private toastrService: ToastrService = inject(ToastrService);

  showLoginErrorMessage: boolean = false;
  isLoading: boolean = false;
  formGroup!: FormGroup;
  showCPasswordText:boolean = false


  ngOnInit(): void {

    console.log("LOGIN INTO MANAGEMENT")
    this.formGroup = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formData() {
    return this.formGroup.value;
  }

  login(): void {
    const loginData: LoginRequestDto = {
      username: this.formData.username,
      password: this.formData.password,
    };
    this.isLoading = true;
    localStorage.clear()
    const loginSubscription$: Subscription = this.authService
      .login2(loginData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
           if(this.formData.username == "kfredrick35@gmail.com") {
            console.log(response)
           }
          if(response.data.passwordExpired){
            this.toastrService.warning("Your password has expired")
          }else{
            this.router.navigate(['/Otp'] , {state:{username:this.formData.username}});
          }

          // console.log(_response);
          // this.router.navigate(['/Auth/Password Expiry'] , {state:{username:this.formData.username}});

//         this.router.navigate(['/Auth/Otp'] , {state:{username:this.formData.username}});
        },
        error: (err:HttpErrorResponse) => {
          this.isLoading = false;
          console.log("error " ,err)
          this.toastrService.warning(err.error.error.message)
        },
        complete: () => {
          loginSubscription$.unsubscribe();
        },
      });
  }
}

