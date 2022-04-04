import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  theme:Theme = new Theme()
  themeList: Theme[]

  constructor(
    private route: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.route.navigate(['/entrar'])
    }
    this.findAllTheme()
  }

  findAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Theme[])=>{
      this.themeList = resp
    })
  }

  register(){
    this.themeService.postTheme(this.theme).subscribe((resp: Theme)=>{
      this.theme = resp
      alert ('Tema cadastrado com sucesso!')
      this.theme = new Theme()
    })
  }

}
