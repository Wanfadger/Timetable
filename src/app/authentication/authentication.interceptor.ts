import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private authService:AuthenticationService = inject(AuthenticationService)

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.authService.Token){
          httpRequest = httpRequest.clone({headers: new HttpHeaders()
            .set('Authorization',`Bearer ${this.authService.Token}`)
            .set('SchoolOwnership','Government')
          })
          return next.handle(httpRequest).pipe(catchError(error => this.handleHttpError(error)))
        }else{
          return next.handle(httpRequest)
        }
    }

    handleHttpError(error: any|HttpErrorResponse) {
      if(error.status == 401) {
         // Expired or invalid token
        this.authService.logout()
      }else if(error.status == 403){
        // Missing Token
       this.authService.logout()
      } else if(error.status == 500){
        // Server exception
        // this.authService.logout()
      }
      return throwError( () => error);
    }
}


