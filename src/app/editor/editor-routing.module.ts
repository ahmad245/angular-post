import { EditorPostTypeComponent } from './editor-post-type/editor-post-type.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { SharedModule } from './../shared/shared.module';
import { AuthGuardService } from '../core/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate:[AuthGuardService],
  },
  {
    path: ':id',
    component: EditorComponent,
    canActivate:[AuthGuardService],
  },
  {
    path: 'postType',
    component: EditorPostTypeComponent,
    canActivate:[AuthGuardService],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
