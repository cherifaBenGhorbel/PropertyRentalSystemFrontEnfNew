import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiURL, apiURL2, apiURLOwn } from '../config';
import { House } from '../model/house.model';
import { Owner } from '../model/owner.model';
import { OwnerWrapper } from '../model/ownerWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiUrl = apiURL2;

  constructor(
    private http: HttpClient
  ) { }

  listHouse(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl, httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}