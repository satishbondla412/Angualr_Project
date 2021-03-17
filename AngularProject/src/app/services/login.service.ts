import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentLanguage;

  constructor(private http: HttpClient) {}

  loginUser(payLoad){
    const bodyString = payLoad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/login`
    return this.http.post(url,bodyString,httpOptions)
      .pipe(map((response) => {
        let resp: any;
        resp = response;
        return resp;
      }),
        catchError(error => this.handleError(error)));
  }
  handleError(error: HttpErrorResponse) {
    let err: any;
    err=error;
      //  this.globalState.isOptimisticError = false; 
        return throwError(err); 
  }
}