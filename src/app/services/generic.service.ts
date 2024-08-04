import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { catchError, first, Observable, of } from 'rxjs';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T extends { id?: number }> {
  protected abstract API: string;

  constructor(
    protected httpClient: HttpClient,
    protected requestService: RequestService
  ) {}

  list(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.API).pipe(
      first(),
      catchError(this.handleError<T[]>('list', []))
    );
  }

  loadById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<T>(`loadById id=${id}`))
    );
  }

  save(registro: T): Observable<RequestResponse> {
    if (!registro.id) {
      return this.create(registro);
    }
    return this.update(registro);
  }

  delete(id: number): Observable<RequestResponse> {
    return this.httpClient.delete<RequestResponse>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<RequestResponse>('delete'))
    );
  }

  private create(registro: Omit<T, 'id'>): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: T): Observable<RequestResponse> {
    if (registro.id === undefined) {
      throw new Error('Cannot update an object without an id');
    }
    return this.httpClient.put<RequestResponse>(`${this.API}/${registro.id}`, registro).pipe(
      catchError(this.handleError<RequestResponse>('update'))
    );
  }

  protected handleError<U>(operation = 'operation', result?: U) {
    return (error: any): Observable<U> => {
      this.requestService.trataErro(error);
      return of(result as U);
    };
  }
}
