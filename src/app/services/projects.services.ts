import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  currentLanguage;

  constructor(private http: HttpClient) {}

  getProjects(apiToken): Observable<any> {
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': `bearer + ${localStorage.getItem('id_token')}`
      });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/projects?api_token=${apiToken}`
    // const url = url;
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );

  }
  getOneProject(id, apiToken): Observable<any> {
    let headers;
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/projects/${id}?api_token=${apiToken}`
    return this.http.get(url, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError(error => this.handleError(error) )
        );
  }
  CreateProject(payLoad){
    const bodyString = payLoad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url =  `http://localhost:8000/api/projects`
    return this.http.post(url,bodyString,httpOptions)
      .pipe(map((response) => {
        let resp: any;
        resp = response;
        return resp;
      }),
        catchError(error => this.handleError(error)));
  }

  updateProject(id,payLoad){
    const bodyString = payLoad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/projects/${id}`
    return this.http.put(url,bodyString,httpOptions)
      .pipe(map((response) => {
        let resp: any;
        resp = response;
        return resp;
      }),
        catchError(error => this.handleError(error)));
  }

  deleteProject(id,apiToken){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    };
    const url = `http://localhost:8000/api/projects/${id}?api_token=${apiToken}`
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