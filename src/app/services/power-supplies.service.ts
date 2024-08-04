import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of } from 'rxjs';
import { PowerSupply } from '../models/power-supply';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class PowerSuppliesService {
  private readonly API = environment.apiUrl +'/inventory/powersupplies';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  list(): Observable<PowerSupply[]> {
    return this.httpClient.get<PowerSupply[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<PowerSupply[]>('listPowerSupplies', []))
    );
  }

  loadById(id:number): Observable<PowerSupply> {
    return this.httpClient.get<PowerSupply>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<PowerSupply>(`loadById id=${id}`))
    );
  }

  save(registro: PowerSupply): Observable<RequestResponse> {
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

  private create(registro: PowerSupply): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: PowerSupply): Observable<RequestResponse> {
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
