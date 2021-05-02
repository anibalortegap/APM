import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string = 'api/products/products.json';
  constructor(private http: HttpClient) {}
  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('[Logging] ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    //In a real world app, we may send the server to some remote logging infrastructure
    //Instead of just logging in the console
    let errorMessage: string = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error ocurred. Handle it accordingly
      errorMessage = `An error ocurrent: ${err.error.message}`;
    } else {
      //The backend returned an unsuccessful response code
      //The response body may contain clues as to what went wrong
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
