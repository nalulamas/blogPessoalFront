import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  idUser: number;
  confirmAnPassword: string;
  typeOfUser: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/enter']);
    }
    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
  }

  confirmPassword(event: any) {
    this.confirmAnPassword = event.target.value;
  }

  typeUser(event: any) {
    this.typeOfUser = event.target.value;
  }

  update() {
    this.user.type = this.typeOfUser;
    console.log(this.user);

    if (this.user.password != this.confirmAnPassword) {
      alert('As senhas estão incorretas');
    } else {
      this.authService.update(this.user).subscribe((resp: User) => {
        this.user = resp;
        alert('Usuário atualizado com sucesso, faça o login novamente');
        environment.token = '';
        environment.name = '';
        environment.picture = '';
        environment.id = 0;

        this.router.navigate(['/enter']);
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp;
    });
  }
}
