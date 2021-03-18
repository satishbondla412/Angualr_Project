import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentLanguage;

  constructor(private http: HttpClient) {}

 getUsers(api_token): Observable<any> {
   debugger;
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': `bearer + ${localStorage.getItem('id_token')}`
      });
    const httpOptions = {
      headers: headers 
    };
    const url = `http://localhost:8000/api/users/?api_token=${api_token}`
    // const url = url;
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );

  }
  getOneUser(id, apiToken): Observable<any> {
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/users/${id}?api_token=${apiToken}`
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );

  }
  updateUser(id,payLoad){
    const bodyString = payLoad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/users/${id}`
    return this.http.put(url,bodyString)
      .pipe(map((response) => {
        let resp: any;
        resp = response;
        return resp;
      }),
        catchError(error => this.handleError(error)));
  }
  createUser(payLoad){
    debugger;
    const bodyString = payLoad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url =  `http://localhost:8000/api/user`
    return this.http.post(url,bodyString,httpOptions)
      .pipe(map((response) => {
        let resp: any;
        resp = response;
        return resp;
      }),
        catchError(error => this.handleError(error)));
  }

  deleteUser(id,apiToken){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/users/${id}/?api_token=${apiToken}`
    return this.http.delete(url,httpOptions)
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