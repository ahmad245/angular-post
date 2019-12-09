import { PostTypeService } from './core/services/post-type.service';
import { PostService } from './core/services/post.service';
import { UserService } from './core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  id = "5d7fc84bd7ebcc3a60c6d8b5";
  postId = "5d81f5793787b02fdcde3c2a";
  postTypeId = "5d7e4ef1745bb018509326da";
  userQuery = gql`
    query user($id:String!){
      user(id:$id){
            name
      }
 }`
  constructor(private uS: UserService, private pS: PostService, private pTS: PostTypeService) {

  }
  ngOnInit() {
   this.uS.populate();
  }
}
