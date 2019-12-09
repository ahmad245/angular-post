import { NgModule } from '@angular/core';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from './../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ProfilePostsComponent, ProfileFavoritesComponent, ProfileComponent],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
