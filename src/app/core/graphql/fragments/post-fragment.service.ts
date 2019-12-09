import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { UserFragmentService } from './user-fragment.service';
@Injectable({
  providedIn: 'root'
})
export class PostFragmentService {

  constructor(private userFrafment:UserFragmentService) { }
  postFragment = gql`
  fragment postFragment on Blog {
    id
    title
    slug
    description
    isPublish
    auther
    tags
    imgUrl
    ...usersFragment
    blogTypeId
    commentIds

  }
  ${this.userFrafment.usersFragment}
 
`;
postTitleFragment = gql`
  fragment postNameFragment on Blog {
    title
  }
`;

postSlugFragment = gql`
  fragment postEmailFragment on Blog {
    slug
  }
`;
postIdFragment = gql`
  fragment postIdFragment on Blog {
      id
  }
`;
// postUserFragment = gql`
//   fragment postUserFragment on Blog {
//       ...postFragment
//       blogs{
//         title
//       }
      
//   }
//   ${this.postFragment}
// `;

}
