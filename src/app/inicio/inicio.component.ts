import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/postagem.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  post: Post = new Post()
  postList: Post[]

  theme: Theme = new Theme()
  themeList: Theme[]
  idTheme: number

  user:User = new User()
  idUser = environment.id

  constructor(
    private route: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService,
    ) {}

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      alert('Seção expirada. Refaça o login.');
      this.route.navigate(['/enter']);
    }
    this.authService.refreshToken()
    this.getAllThemes()
    this.getAllPosts()
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
    getAllPosts(){
      this.postService.getAllPosts().subscribe((resp: Post[])=>{
        this.postList = resp
      })
    }

    findByIdUser(){
      this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
        this.user = resp
      })
    }

    publicar(){
      this.theme.id = this.idTheme
      this.post.theme = this.theme

      this.user.id = this.idUser
      this.post.creator = this.user

      console.log(this.post)
      this.postService.postPost(this.post).subscribe((resp: Post)=>{
        this.post = resp
        alert('Postagem realizada com sucesso!')
        this.post = new Post()
        this.getAllPosts()
      })

    }
  }
