import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, catchError, first, of } from 'rxjs';
import { RequestResponse } from '../models/request-response';
import { RequestService } from './request.service';
import { Motherboard } from '../models/motherboard';
import { Processor } from '../models/processor';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService {

  private readonly API = environment.apiUrl +'/inventory/cpus';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  list(): Observable<Processor[]> {
    return this.httpClient.get<Processor[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Processor[]>('listProcessors', []))
    );
  }

  loadById(id:number): Observable<Processor> {
    return this.httpClient.get<Processor>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Processor>(`loadById id=${id}`))
    );
  }

  save(registro: Processor): Observable<RequestResponse> {
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

  private create(registro: Processor): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Processor): Observable<RequestResponse> {
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
