import { Injectable } from '@angular/core';
import { GraphqlService } from '../graphql/graphql.service';
import { CommentQueryService } from '../graphql/queries/comment-query.service';
import { QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private gQLService: GraphqlService,
    private commentQuerie: CommentQueryService,
   
  ) {}
  
    
    // getAll():QueryRef<any>{
    //   return this.gQLService.query(this.commentQuerie.commentById(['title','id']))
    // }
    getById(id){
      return this.gQLService.query(this.commentQuerie.commentById(['title']),{id})
    }
  
  }
  