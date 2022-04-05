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
  userLogin:UserLogin = new UserLogin()

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(){
      window.scroll(0,0)
  }

  enter(){
    this.auth.enter(this.userLogin).subscribe({
      next: (resp: UserLogin)=>{
        this.userLogin = resp
        environment.id=this.userLogin.id
        environment.name=this.userLogin.name
        environment.picture=this.userLogin.picture
        environment.token=this.userLogin.token

        console.log(environment)
        this.router.navigate(['/inicio'])
      },
      error: erro =>{
        if(erro.status == 401){
          alert('Usuário não encontrado.')
        }
      }
    })
  }
}
