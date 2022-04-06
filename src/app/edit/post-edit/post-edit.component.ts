import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostagemService } from 'src/app/service/postagem.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Post = new Post()

  theme: Theme = new Theme()
  themeList: Theme[]
  idTheme: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostagemService,
    private themeService: ThemeService,
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/enter'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllTheme()
  }
  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: Post)=>{
      this.post = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Theme)=>{
      this.theme = resp
    })
  }

  findAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Theme[])=>{
      this.themeList = resp
    })
  }

  update(){
    this.theme.id = this.idTheme
    this.post.theme = this.theme

    this.postService.putPostagem(this.post).subscribe((resp: Post)=>{
      this.post = resp
      alert ('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
