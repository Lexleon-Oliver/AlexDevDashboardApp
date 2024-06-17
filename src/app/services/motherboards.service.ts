import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of } from 'rxjs';
import { RequestResponse } from '../models/request-response';
import { RequestService } from './request.service';
import { Motherboard } from '../models/motherboard';

@Injectable({
  providedIn: 'root'
})
export class MotherboardsService {

  private readonly API = environment.apiUrl +'/inventory/motherboards';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  listMotherboards(): Observable<Motherboard[]> {
    return this.httpClient.get<Motherboard[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Motherboard[]>('listMotherboards', []))
    );
  }

  loadById(id:number): Observable<Motherboard> {
    return this.httpClient.get<Motherboard>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Motherboard>(`loadById id=${id}`))
    );
  }

  save(registro: Motherboard): Observable<RequestResponse> {
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

  private create(registro: Motherboard): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Motherboard): Observable<RequestResponse> {
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
