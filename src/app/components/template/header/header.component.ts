import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/views/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const username: string = this.authService.auth.name;
  }

  signOut() {
    this.authService.googleSignOut();
  }
}
