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

  getByIdPost(id: number): Observable<Post>{
  return this.http.get<Post>(`https://blognalu.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(post: Post): Observable<Post>{
    return this.http.post<Post>('https://blognalu.herokuapp.com/postagens', post, this.token)
  }
  putPostagem(post: Post): Observable<Post>{
return this.http.put<Post>('https://blognalu.herokuapp.com/postagens',post, this.token)
  }

  deletePost(id: number){
    return this.http.delete(`https://blognalu.herokuapp.com/postagens/${id}`, this.token)
  }
}
