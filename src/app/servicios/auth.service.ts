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
      map( (data: any) => {this.guardarToken(data); return data; } )
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
  guardarToken(token) {

    this.userToken = token.idToken;
    localStorage.setItem('token', this.userToken);
    const hoy = new Date();
    hoy.setSeconds(token.expiresIn);
    // expiresIn
    localStorage.setItem('expira', hoy.getTime().toString());

  }
  leerToken() {
    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
  estaAutenteticado(): boolean {
    if (this.userToken.length === 0) {
      return false;
    } else {
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if (expiraDate > new Date() ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
