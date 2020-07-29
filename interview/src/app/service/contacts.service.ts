import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiUrl = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  createContactService(form_data){
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      var params = form_data
      this.http.post(environment.apiUrl+'/contact', params).subscribe((data:any) => {
        resolve(data);
      }, error =>
      {
        reject(error);
      });
    });
  }
}
