import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient){}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('https://blognalu.herokuapp.com/postagens', this.token)
  }

  postPostagem(post: Post): Observable<Post>{
    return this.htpp.post<Post>('https://blognalu.herokuapp.com/postagens', post, this.token)
  }
}
