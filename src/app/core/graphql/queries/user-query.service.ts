import { Injectable } from '@angular/core';
import { UserFragmentService } from '../fragments/user-fragment.service';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class UserQueryService {

  constructor(private userFragment: UserFragmentService) { }

  allUsersByFragment =
    gql`
  query users {
      users {
        ...userPostFragment
      }
  }
  ${this.userFragment.userPostFragment}
`;

  allUser(array: any[]) {
    return gql`
      query users($page:Int=1,$pageSize:Int=1){
        users(page:$page,pageSize:$pageSize){
          ${[...array]}
        }
    }
`
  }
  me(array: any[]) {
    return gql`
      query me{
        me{
          ${[...array]}
        }
    }
`
  }

  userById(array: any[]) {
    return gql`
      query user($id:String){
        user(id:$id){
          ${[...array]}
    }
  }`
  }

}
