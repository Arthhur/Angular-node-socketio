import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';




const routes: Routes = [
  {path: 'home', component: NavbarComponent,
    children: [
      {path: 'carousel', component: HomeComponent},
      {path: 'admin', component: ImageComponent},
    ]
  },
  { path: '', redirectTo: 'home/carousel', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
