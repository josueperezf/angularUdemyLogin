import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  recordar = false;
  constructor(private router: Router , private authService: AuthService ) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
    }

  }
  login(formulario) {
    if (!formulario.valid) {
      return false;
    }
    if ( this.recordar) {
      localStorage.setItem('email', formulario.value.email);
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.authService.login(formulario.value).subscribe(
      (data) => {
        Swal.close(); console.log(data);
        this.router.navigate(['/home']);
        console.log('salio');
      },
      (error: any) => {
        console.log(error.error.error.message );
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al autenticar',
          icon: 'error',
          text: 'error.error.error.message'
        });
      }
    );
  }
}
