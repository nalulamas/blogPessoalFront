import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css'],
})
export class ThemeDeleteComponent implements OnInit {
  theme: Theme = new Theme();
  idTheme: number
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.idTheme= this.route.snapshot.params['id']
    this.findByIdTheme(this.idTheme)
  }
  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Theme)=>{
      this.theme = resp
    })
  }

  delete(){
    this.themeService.getByIdTheme(this.idTheme).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/theme'])
    })
  }
}
