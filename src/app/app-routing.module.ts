import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPersonComponent } from './components/person/new-person/new-person.component';
import { PersonReadComponent } from './components/person/person-read/person-read.component';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'person',
    component: PersonReadComponent,
  },
  {
    path: 'person/new',
    component: NewPersonComponent,
  },
  {
    path: 'person/edit/:id',
    component: NewPersonComponent,
  },
  {
    path: 'person/delete/:id',
    component: NewPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
