import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTheme(): Observable<Theme[]>{
    return this.http.get<Theme[]>('https://blognalu.herokuapp.com/theme', this.token)
  }

  getByIdTheme(id: number): Observable<Theme>{
    return this.http.get<Theme>(`https://blognalu.herokuapp.com/theme/${id}`, this.token)
  }

  postTheme(theme: Theme): Observable<Theme>{
    return this.http.post<Theme>('https://blognalu.herokuapp.com/theme',theme, this.token)
  }

  putTheme(theme: Theme): Observable<Theme>{
    return this.http.put<Theme>('https://blognalu.herokuapp.com/theme', theme, this.token)
  }

  deleteTheme(id: number){
return this.http.delete(`https://blognalu.herokuapp.com/theme/${id}` , this.token)
  }
}
