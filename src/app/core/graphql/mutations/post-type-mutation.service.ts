import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})

export class PostTypeMutationService{
    constructor(){}
    addPostType=gql`
        mutation  addBlog_type($name:String){
            addBlog_type(name:$name){
                name
            }
        }
    `;
}