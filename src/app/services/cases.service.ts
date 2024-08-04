import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { catchError, first, Observable, of } from 'rxjs';
import { Case } from '../models/case';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  private readonly API = environment.apiUrl +'/inventory/cases';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  list(): Observable<Case[]> {
    return this.httpClient.get<Case[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Case[]>('listCases', []))
    );
  }

  loadById(id:number): Observable<Case> {
    return this.httpClient.get<Case>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Case>(`loadById id=${id}`))
    );
  }

  save(registro: Case): Observable<RequestResponse> {
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

  private create(registro: Case): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Case): Observable<RequestResponse> {
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
