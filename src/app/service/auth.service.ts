import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  enter(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blognalu.herokuapp.com/users/login', userLogin)
  }

  register(user: User): Observable<User>{
    return this.http.post<User>('https://blognalu.herokuapp.com/users/register', user)
  }

  logged(){
    let ok = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://blognalu.herokuapp.com/${id}`)
  }

  update(user: User): Observable<User>{
    return this.http.put<User>('https://blognalu.herokuapp.com/user/update', user, this.token)
  }

}
