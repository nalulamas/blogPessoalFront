import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  user: User = new User();
  confirmAnPassword: string
  typeOfUser: string

  constructor(
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(){
    window.scroll(0,0);
    }

    confirmPassword(event: any) {
      this.confirmAnPassword = event.target.value
    }

    typeUser(event: any){
      this.typeOfUser = event.target.value
    }

    register(){
      this.user.type = this.typeOfUser

      if(this.user.password != this.confirmAnPassword){
        alert ('As senhas estão incorretas.')
      }else{
        console.log(this.user)
        this.authService.register(this.user).subscribe((resp: User) => {
          this.user = resp
          this.router.navigate(['/enter'])

          alert('Usuario cadastrado com sucesso!')
        })
      }
    }
}
