import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostagemService } from 'src/app/service/postagem.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css'],
})
export class PostDeleteComponent implements OnInit {
  post: Post = new Post();
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/enter']);
    }
    this.idPost = this.route.snapshot.params['id'];
    this.findByIdPost(this.idPost)
  }
  findByIdPost(id: number) {
    this.postagemService.getByIdPost(id).subscribe((resp: Post) => {
      this.post = resp;
    });
  }

  delete() {
    this.postagemService.deletePost(this.idPost).subscribe(()=>{
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
