import { PostResolverService } from './post/post-resolver.service';
import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'',component:PostComponent,
  
  resolve:{
    post:PostResolverService
  }   
}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BlogRoutingModule { }

