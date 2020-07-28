import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../../serivces/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSumit( form: NgForm) {
     console.log('Registro');
     console.log(this.usuario);
     if (form.invalid){ return; }

     Swal.fire({
      icon: 'info',
      title: 'Espere por favor',
    })
    Swal.showLoading();

     this.auth.nuevoUsuario( this.usuario ).subscribe(resp=> {
      console.log(resp);
      Swal.close();
      if ( this.recuerdame){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
     },
     (err) =>{
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'erorr',
          title: 'Erro al autenticar',
          text: err.error.error.message
        })
    });
   }


}
