import { Component, OnInit } from '@angular/core';
import { user } from 'rxfire/auth';
import { AuthService } from '../login/auth.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: User;
  username: string = user.name;

  ngOnInit(): void {}
}
