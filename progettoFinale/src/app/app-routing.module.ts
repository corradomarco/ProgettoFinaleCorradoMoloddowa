import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeDecisioneComponent } from './home-decisione/home-decisione.component';
import { RilasciaComponent } from './rilascia/rilascia.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },  { path: 'home', component: HomeComponent },
  {path:'home2',component:HomeDecisioneComponent},
    {path:'rilascia',component:RilasciaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
