import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';




const routes: Routes = [
  {path: 'admin', component: NavbarComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
