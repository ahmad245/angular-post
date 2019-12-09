
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './blogComponents/post-list/post-list.component';
import { PostMetaComponent } from './blogComponents/post-meta/post-meta.component';
import { PostPreviewComponent } from './blogComponents/post-preview/post-preview.component';
import { LikeButtonComponent } from './bottun/like-button/like-button.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SideNavTagsComponent } from './layout/side-nav-tags/side-nav-tags.component';

import { QuillModule } from 'ngx-quill';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ListErrorsComponent } from './list-errors.component';
import { PostTypeComponent } from './blogComponents/post-type/post-type.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { SearchComponent } from './layout/search/search.component';
import { AppShowAuthedDirective } from './directive/app-show-authed.directive';
import { AppShowSuperAdminDirective } from './directive/app-show-superAdmin.directive';
import { AppShowWriterDirective } from './directive/app-show-writer.directive';
import { AppShowUpdaterDirective } from './directive/app-show-updater.directive';
import { AppShowDeleterDirective } from './directive/app-show-deleter.directive';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { MarkdownPipe } from './pipes/markdown.pipe';



@NgModule({
  declarations: [
    PostListComponent, 
    PostMetaComponent,
     PostPreviewComponent, 
     LikeButtonComponent,
      SideNavComponent,
      SideNavTagsComponent,
      ListErrorsComponent,
      PostTypeComponent,
      SpinnerComponent,
      SearchComponent,
      
      AppShowAuthedDirective,
      AppShowSuperAdminDirective,
      AppShowWriterDirective,
      AppShowUpdaterDirective,
      AppShowDeleterDirective,

      ConfirmDialogComponent,

      ShortenPipe,
      MarkdownPipe

    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    QuillModule.forRoot(),
    MatFileUploadModule
  ],
  exports:[
    PostListComponent,
     PostMetaComponent,
      PostPreviewComponent, 
      LikeButtonComponent, 
      SideNavComponent,
      SideNavTagsComponent,
      ListErrorsComponent,
      PostTypeComponent,
      SpinnerComponent,
      SearchComponent,
      ConfirmDialogComponent,

      AppShowAuthedDirective,
      AppShowSuperAdminDirective,
      AppShowWriterDirective,
      AppShowUpdaterDirective,
      AppShowDeleterDirective,

      ShortenPipe,
      MarkdownPipe,
      
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    QuillModule,
    MatFileUploadModule
    
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
