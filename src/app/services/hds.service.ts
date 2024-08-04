import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Hd } from '../models/hd';
import { catchError, first, Observable, of } from 'rxjs';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class HdsService {

  private readonly API = environment.apiUrl +'/inventory/hds';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  list(): Observable<Hd[]> {
    return this.httpClient.get<Hd[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Hd[]>('listHds', []))
    );
  }

  loadById(id:number): Observable<Hd> {
    return this.httpClient.get<Hd>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Hd>(`loadById id=${id}`))
    );
  }

  save(registro: Hd): Observable<RequestResponse> {
    if (!registro.id) {
      return this.create(registro);
    }
    return this.update(registro);
  }

  delete(id:number): Observable<RequestResponse> {
    return this.httpClient.delete<RequestResponse>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<RequestResponse>('delete'))
    );
  }

  private create(registro: Hd): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Hd): Observable<RequestResponse> {
    return this.httpClient.put<RequestResponse>(`${this.API}/${registro.id}`, registro).pipe(
      catchError(this.handleError<RequestResponse>('update'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.requestService.trataErro(error);
      return of(result as T);
    };
  }
}
