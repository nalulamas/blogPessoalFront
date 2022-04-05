import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  post: Post = new Post()
  theme: Theme = new Theme()
  themeList: Theme[]
  idTheme: number

  user:User = new User()
  idUser = environment.id

  constructor(
    private route: Router,
    private postagemService: PostagemService,
    private themeService: ThemeService,
    ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Seção expirada. Refaça o login.');
      this.route.navigate(['/enter']);
    }
    this.getAllThemes()
  }
    getAllThemes(){
      this.themeService.getAllTheme().subscribe((resp: Theme[])=>{
        this.themeList = resp
      })
    }

    findByIdTheme(){
      this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Theme)=>{
        this.theme = resp
      })
    }

    publicar(){
      this.theme.id = this.idTheme
      this.post.theme = this.theme

      this.user.id = this.idUser
      this.post.creator = this.user

      this.postagemService.postPostagem(this.post).subscribe((resp: Postagem)=>{
        this.post = resp
        alert('Postagem realizada com sucesso!')
        this.post = new Post()
      })

    }
  }
