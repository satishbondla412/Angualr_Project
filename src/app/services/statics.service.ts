import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  currentLanguage;

  constructor(private http: HttpClient) {}
  getStatics(apiToken): Observable<any> {
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': `bearer + ${localStorage.getItem('id_token')}`
      });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/projects_statistics?api_token=${apiToken}`
    // const url = url;
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );

  }
  getOneStatics(id, apiToken): Observable<any> {
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': `bearer + ${localStorage.getItem('id_token')}`
      });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/user_statistics/${id}?api_token=${apiToken}`
    // const url = url;
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );

  }
  handleError(error: HttpErrorResponse) {
    let err: any;
    err=error;
      //  this.globalState.isOptimisticError = false; 
        return throwError(err); 
  }
}
