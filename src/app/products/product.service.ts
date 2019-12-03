import { Injectable } from "@angular/core";
import { IProduct } from "./product";

import { Observable, throwError } from 'rxjs';
import { catchError,tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

  private productUrl='api/products/products.json';
  constructor(private http: HttpClient){

  }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All'+ JSON.stringify(data))),
          catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse){
      // in real world app we may send server data to some remote logging infrastructure 
      // instead of just logging it in the console
      let errorMessage = '';
      if(err.error instanceof ErrorEvent){
        // client side or network error occured Handle it accordingly
        errorMessage= `An Error Occured: ${err.error.message}`;
      }else{
        // Backend service returned an unsuccessful response code, 
        // The Response body may contain clues as to what went wrong
        errorMessage= `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}
