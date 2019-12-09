import { PostTypeMutationService } from './../graphql/mutations/post-type-mutation.service';
import { Injectable } from '@angular/core';
import { GraphqlService } from '../graphql/graphql.service';
import { PostTypeQueryService } from '../graphql/queries/post-type-query.service';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostTypeService {
  constructor(
    private gQLService: GraphqlService,
    private postTypeQuerie: PostTypeQueryService,
    private postTypeMutaion:PostTypeMutationService

  ) {}
  
    
    getAll():Observable<any>{
      return this.gQLService.query(this.postTypeQuerie.allPostType(['name','id']))
      .valueChanges.pipe(map(response=>response.data))
    }
    getById(id){
      return this.gQLService.query(this.postTypeQuerie.postTypeById(['name']),{id})
    }
    post(name:string){
     return this.gQLService.mutate(this.postTypeMutaion.addPostType,{name}, 
      (store, { data: { addBlog_type } }) => {
      const data: any = store.readQuery({
        query:this.postTypeQuerie.allPostType(['name','id'])
      });
  
      
      data.blogTypes.push(addBlog_type);
  
      store.writeQuery({ query: this.postTypeQuerie.allPostType(['name','id']), data })
    })
    }
  
  }
  
     