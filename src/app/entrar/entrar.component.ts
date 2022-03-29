import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { UserLogin } from './../model/UserLogin'

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  enter(){
    this.auth.enter(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.name = this.userLogin.name
      environment.picture = this.userLogin.picture
      environment.id = this.userLogin.id

      console.log(environment.token)
      console.log(environment.name)
      console.log(environment.picture)
      console.log(environment.id)

      this.userLogin.picture

      this.router.navigate(['/inicio'])

    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha não encontrados.')
      }
    })
  }

}
