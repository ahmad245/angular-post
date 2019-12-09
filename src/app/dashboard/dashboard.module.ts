import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersBoardComponent } from './users-board/users-board.component';
import { PostTypesBoardComponent } from './post-types-board/post-types-board.component';
import { PostsBoardComponent } from './posts-board/posts-board.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RolesComponent } from './roles/roles.component';



@NgModule({
  declarations: [UsersBoardComponent, PostTypesBoardComponent,PostsBoardComponent, RolesComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  exports:[UsersBoardComponent, PostTypesBoardComponent,PostsBoardComponent],
  entryComponents:[RolesComponent]
})
export class DashboardModule { }
