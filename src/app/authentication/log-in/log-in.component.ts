import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDto } from '../authentication.dto';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  private authService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);

  showLoginErrorMessage: boolean = false;
  isLoading: boolean = false;
  formGroup!: FormGroup;


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
        next: (_response) => {
          this.isLoading = false;

          console.log(_response);

         this.router.navigate(['/Otp'] , {state:{username:this.formData.username}});
        },
        error: (err:HttpErrorResponse) => {
          this.isLoading = false;
          console.log("error " ,err)
          alert(err.error.error.message)
        },
        complete: () => {
          loginSubscription$.unsubscribe();
        },
      });
  }
}

