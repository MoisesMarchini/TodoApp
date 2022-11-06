import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './Components/cards/cards.component';
import { LoginComponent } from './Components/login/login.component';
import { NewUserComponent } from './Components/new-user/new-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'new-user', component: NewUserComponent},
  { path: 'my-todos', component: CardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
