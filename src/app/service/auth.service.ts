import { HttpClient } from '@angular/common/http';
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

  enter(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blognalu.herokuapp.com/users/login', userLogin)
  }

  register(user: User): Observable<User>{
    return this.http.post<User>('https://blognalu.herokuapp.com/users/register', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://blognalu.herokuapp.com/${id}`)
  }

  logged(){
    let ok = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

}
