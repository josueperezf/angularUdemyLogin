import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {

  }
  canActivate(
    // ActivatedRouteSnapshot contiene el nombre de la siguiente ruta donde el usuario intenta navegar
    // RouterStateSnapshot esta actual de la ruta
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): boolean {
    if (this.authService.estaAutenteticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
