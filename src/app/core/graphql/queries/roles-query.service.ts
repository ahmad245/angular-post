import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class RolesQueryService {

  constructor() { }
  allRoles(array: any[]) {
    return gql`
       query Roles{
        Roles{
           ${[...array]}
         }
       }
    `
  }

  RolesById(array: any[]) {
    return gql`
      query Role($id:String){
        Role(id:$id){
          ${[...array]}
        }
      }`


  }
}