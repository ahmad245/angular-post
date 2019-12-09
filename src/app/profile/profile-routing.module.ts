import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [{
  path: 'username', component: ProfileComponent,
  canActivate:[AuthGuardService],
  children: [
    { path: '', component: ProfilePostsComponent },
    { path: 'favorites', component: ProfileFavoritesComponent }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
