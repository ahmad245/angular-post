import { NgModule } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import {SharedModule} from './../shared/shared.module';
import{EditorRoutingModule} from './editor-routing.module';
import { EditorPostTypeComponent } from './editor-post-type/editor-post-type.component';


@NgModule({
  declarations: [EditorComponent, EditorPostTypeComponent],
  imports: [
    SharedModule,
    EditorRoutingModule
  ],
 
})
export class EditorModule { }
