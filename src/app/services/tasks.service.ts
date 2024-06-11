import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, catchError, first, of } from 'rxjs';
import { RequestResponse } from '../models/request-response';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = environment.apiUrl +'/tasks';

  constructor(
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
  }

  listTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API)
    .pipe(
      first(),
      catchError(this.handleError<Task[]>('listTasks', []))
    );
  }

  loadById(id:number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.API}/${id}`).pipe(
      catchError(this.handleError<Task>(`loadById id=${id}`))
    );
  }

  save(registro: Task): Observable<RequestResponse> {
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

  private create(registro: Task): Observable<RequestResponse> {
    return this.httpClient.post<RequestResponse>(this.API, registro).pipe(
      catchError(this.handleError<RequestResponse>('create'))
    );
  }

  private update(registro: Task): Observable<RequestResponse> {
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
