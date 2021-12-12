import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './views/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cadastro de Funcionários';

  showMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authService.showMenu.subscribe((show) => (this.showMenu = show));

    if (!this.showMenu) {
      this.router.navigate(['/login']);
    }
  }
}
