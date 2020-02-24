import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  public apiKey = 'AIzaSyD7ztsEKQ1ENCJuqBrnqZlj_xbT5uC3S_g';
  public userToken;
  // crear usuario
  // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    this.leerToken();
  }
  nuevoUsuario(usuario: UsuarioModel ) {
    const enviar = {
      email : usuario.email,
      password : usuario.password,
      returnSecureToken: true
    };
    return this.http.post( `${this.url}:signUp?key=${this.apiKey}` , enviar);
  }
  login(usuario: UsuarioModel) {
    const enviar = {
      email : usuario.email,
      password : usuario.password,
      returnSecureToken: true
    };
    return this.http.post( `${this.url}:signInWithPassword?key=${this.apiKey}` , enviar).pipe(
      map( (data: any) => { this.guardarToken(data.idToken); return data; } )
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
  guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', this.userToken);
  }
  leerToken() {
    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
  estaAutenteticado(): boolean {
    return this.userToken.length > 2;
  }
}
