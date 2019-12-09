import { Injectable } from '@angular/core';
import { UserFragmentService } from '../fragments/user-fragment.service';
// graphql-tag is a GraphQL parser. Every GraphQL operation you hand over to Apollo Client will have to be parsed by the gql function.
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class PostQueryService {

  constructor() { }
  allPost(array: any[]) {
    return gql`
       query blogs($page:Int=1,$pageSize:Int=1,$search:String){
         blogs(page:$page,pageSize:$pageSize,search:$search){
           ${[...array]}
         }
       }
    `;
  }
  postByType(array:any[]){
    return gql`
      query blogs($id:String,$page:Int,$pageSize:Int){
        blogs(id:$id,page:$page,pageSize:$pageSize){
          ${[...array]}
        }
      }`;
  }
  
  postById(array: any[]) {
    return gql`
      query blog($id:String){
        blog(id:$id){
          ${[...array]}
        }
      }`;
  }
  refrechPost(array:any[]){
    return gql`
    query refrechPost($id:String,$page:Int=1,$pageSize:Int=1,$search:String){
     
      blogs(page:$page,pageSize:$pageSize,search:$search){
        ${[...array]}
      }
    
    
        blogs(id:$id,page:$page,pageSize:$pageSize){
          ${[...array]}
        }
      
    }
    
 `;
  }

}