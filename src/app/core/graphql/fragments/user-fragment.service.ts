import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class UserFragmentService {
  usersFragment = gql`
  fragment usersFragment on User {
      id
      name
      email
  }
`;
userNameFragment = gql`
  fragment userNameFragment on User {
      name
  }
`;

userEmailFragment = gql`
  fragment userEmailFragment on User {
      email
  }
`;
userIdFragment = gql`
  fragment userIdFragment on User {
      id
  }
`;
userPostFragment = gql`
  fragment userPostFragment on User {
      ...usersFragment
      blogs{
        title
      }
      
  }
  ${this.usersFragment}
`;



  constructor() { }
}
