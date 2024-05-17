import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { UserLogged } from '../models/user-logged';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private dadosCarregados: boolean = false;
  private usuarioLogado!: UserLogged;

  constructor(
    private http: HttpClient,
    public requestService: RequestService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse | HttpErrorResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body).pipe(
      switchMap((response) => {
        this.cookieService.set('jwtToken', response.token, undefined, '/', '', true, 'Strict');
        this.cookieService.set('jwtTokenRefresh', response.refreshToken, undefined, '/', '', true, 'Strict');
        return this.setUsuarioLogado().pipe(
          map((usuarioLogado) => {
            this.usuarioLogado = usuarioLogado;
            this.dadosCarregados = true;
            return response;
          }),
          catchError((error) => {
            console.error("Erro em setUsuarioLogado "+error);
            return throwError(() => error);
          })
        );
      }),
      catchError((error) => {
        console.error("Erro em Login "+error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('jwtToken', '/');
    this.cookieService.delete('jwtTokenRefresh', '/');
  }

  setUsuarioLogado(): Observable<UserLogged> {
    return this.http.get<UserLogged>(`${this.apiUrl}/users/mydetails`);
  }

  dadosUsuarioCarregados(): boolean {
    return this.dadosCarregados;
  }

  isAuthenticatedUser(): boolean {
    const token = this.cookieService.get('jwtToken');
    return !!token;
  }

  getUsuarioLogado(): UserLogged {
    return this.usuarioLogado;
  }

  renewToken(): Observable<any> {
    return this.refreshToken().pipe(
      switchMap((token) => {
        this.cookieService.set('jwtToken', token.token, undefined, '/', '', true, 'Strict');
        this.cookieService.set('jwtTokenRefresh', token.refreshToken, undefined, '/', '', true, 'Strict');
        return this.setUsuarioLogado();
      }),
      catchError((error) => {
        return throwError(()=> error);
      })
      );
  }

  private refreshToken():Observable<LoginResponse> {
    let token = this.cookieService.get('jwtTokenRefresh');
    let body = { token };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refreshToken`, body);
  }

  getFirstAndLastName(): string {
    const names = this.usuarioLogado.username.split('.');
    const firstName =  names[0].replace(/[@]/g, '');
    const lastName = names[1];
    return `${firstName} ${lastName}`;
  }

  getJobTitle():string{
    return this.usuarioLogado.jobTitle;
  }



}
