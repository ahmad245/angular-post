import { UsersBoardComponent } from './users-board/users-board.component';
import { PostsBoardComponent } from './posts-board/posts-board.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypesBoardComponent } from './post-types-board/post-types-board.component';

const routes:Routes=[
  {path:'',component:PostsBoardComponent},
  {path:'users',component:UsersBoardComponent},
  {path:'postTypes',component:PostTypesBoardComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }