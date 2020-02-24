import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public usuario: UsuarioModel;

  constructor(
    private router: Router,
    private authService: AuthService ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'josueperezf@gmail.com';
  }
  onSubmit(formulario) {
    console.log(formulario.value);
    if (!formulario.valid) {
      return false;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    this.authService.nuevoUsuario(formulario.value).subscribe(
      (data) => { Swal.close(); this.router.navigateByUrl('/home');  console.log(data); },
      (error: any) => {
        console.log(error.error.error.message );
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al Registrar',
          icon: 'error',
          text: 'error.error.error.message'
        });
      }
    );
  }

}
