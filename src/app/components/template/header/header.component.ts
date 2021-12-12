import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/views/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userName = this.authService.auth.currentUser.displayName
  userPhoto = this.authService.auth.currentUser.photoURL

  ngOnInit(): void {
    
    
  }

  signOut() {
    this.authService.googleSignOut();
  }
}
