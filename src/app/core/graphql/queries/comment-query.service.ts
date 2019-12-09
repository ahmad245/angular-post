import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class CommentQueryService {

  constructor() { }
 
  
  commentById(array: any[]) {
    return gql`
      query comment($id:String){
        comment(id:$id){
          ${[...array]}
        }
      }`


  }
}