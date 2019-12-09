import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class PostTypeQueryService {

  constructor() { }
  allPostType(array: any[]) {
    return gql`
       query blogTypes{
        blogTypes{
           ${[...array]}
         }
       }
    `
  }

  postTypeById(array: any[]) {
    return gql`
      query blogType($id:String){
        blogType(id:$id){
          ${[...array]}
        }
      }`


  }
}