import { PostResolverService } from './post/post-resolver.service';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { PostTypeComponent } from './post-type/post-type.component';
import {BlogRoutingModule} from './blog-routing.module';

import {SharedModule} from './../shared/shared.module';




@NgModule({
  declarations: [PostComponent, CommentComponent, PostTypeComponent],
  imports: [
   SharedModule,
   BlogRoutingModule,
   
  ],
  providers: [
    PostResolverService
  ]

})
export class BlogModule { }
