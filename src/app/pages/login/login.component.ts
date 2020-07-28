import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../serivces/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recuerdame = false; 

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    if ( localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  login ( form: NgForm ){
    if ( form.invalid ){
      console.log(form);
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere por favor',
    })
    Swal.showLoading();

    this.auth.logIn( this.usuario ).subscribe(resp=> {
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
