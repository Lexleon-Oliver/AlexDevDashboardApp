import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { UserLogged } from '../models/user-logged';
import { MyNotification } from '../models/my-notification';
import { ThemesService } from './themes.service';
import { RequestResponse } from '../models/request-response';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private dadosCarregados: boolean = false;
  private usuarioLogado!: UserLogged | undefined;

  constructor(
    private http: HttpClient,
    public requestService: RequestService,
    private cookieService: CookieService,
    private themeService: ThemesService,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body).pipe(
      switchMap((response) => {
        this.cookieService.set('jwtToken', response.token, undefined, '/', '', true, 'Strict');
        this.cookieService.set('jwtTokenRefresh', response.refreshToken, undefined, '/', '', true, 'Strict');
        return this.setUsuarioLogado().pipe(
          map((usuarioLogado) => {
            this.usuarioLogado = usuarioLogado;
            this.themeService.setInitialTheme(this.getTheme());
            this.dadosCarregados = true;
            return response;
          }),
        );
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('jwtToken', '/');
    this.cookieService.delete('jwtTokenRefresh', '/');
    this.usuarioLogado = undefined;
    this.dadosCarregados = false;
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

  getUsuarioLogado(): UserLogged | undefined {
    return this.usuarioLogado;
  }

  renewToken(): Observable<any> {
    let refreshToken = this.cookieService.get('jwtTokenRefresh');

    if (!refreshToken) {
        // Se o token de refresh não estiver presente, lançar um erro
        return throwError(() => new Error('Refresh token not found'));
    }

    return this.refreshToken(refreshToken).pipe(
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

  private refreshToken(refreshToken: string): Observable<LoginResponse> {
    let body = { token: refreshToken };
    // Enviando a requisição para renovar o token
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refreshToken`, body);
  }

  getFirstAndLastName(): string {
    if (!this.usuarioLogado) {
      return '';
    }
    const names = this.usuarioLogado.username.split('.');
    const firstName =  names[0].replace(/[@]/g, '');
    const lastName = names[1] ?? '';
    return `${firstName} ${lastName}`;
  }

  getJobTitle():string{
    return this.usuarioLogado?.jobTitle ?? "";
  }

  getTheme():string{
    return this.usuarioLogado?.theme ?? "Claro";
  }

  getNotifications(): MyNotification[]{
    return this.usuarioLogado?.notifications ?? [];
  }

  executeAfterReload(){
    if(!this.requestService.isLoading){
      this.requestService.showLoading();
    }

    if(this.isAuthenticatedUser()){
      this.setUsuarioLogado().subscribe({
        next: (usuarioLogado) => {
          this.usuarioLogado = usuarioLogado;
          this.themeService.setInitialTheme(this.getTheme());
          this.dadosCarregados = true;
          this.requestService.hideLoading();

        },
        error: (error) => {
          this.requestService.hideLoading();
          console.error("Erro ao carregar: ", error)
            // this.logout();
        }
      });
    }
  }

  userHasPermissions(requiredPermissions: string[]): boolean {
    if (this.dadosCarregados) {
      return requiredPermissions.every(permission => this.usuarioLogado?.roles.includes(permission));
    } else {
      setTimeout(() => {
        this.userHasPermissions(requiredPermissions);
      }, 100);
      return false;
    }
  }

  updateUserProfile(updatedUser: Partial<UserLogged>): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${this.apiUrl}/users/mydetails`, updatedUser);
  }

  changePassword(currentPassword: string, newPassword: string) {
    const body = { currentPassword, newPassword };
    return this.http.post<RequestResponse>(`${this.apiUrl}/users/changepassword`, body);
  }

  register(registerData: Register): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${this.apiUrl}/auth/register`, registerData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
