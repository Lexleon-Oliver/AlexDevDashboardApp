import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable, catchError, first, of } from 'rxjs';
import { Memory } from '../models/memory';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService {
  private readonly API = environment.apiUrl +'/inventory/memories';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  list(): Observable<Memory[]> {
    return this.httpClient.get<Memory[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Memory[]>('listMemories', []))
    );
  }

  loadById(id:number): Observable<Memory> {
    return this.httpClient.get<Memory>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Memory>(`loadById id=${id}`))
    );
  }

  save(registro: Memory): Observable<RequestResponse> {
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

  private create(registro: Memory): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Memory): Observable<RequestResponse> {
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
