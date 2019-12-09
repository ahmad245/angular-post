import { PostMutationService } from './../graphql/mutations/post-mutation.service';
import { IPost } from 'src/app/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { GraphqlService } from './../graphql/graphql.service';
import { Injectable } from '@angular/core';
import { UserQueryService } from '../graphql/queries/user-query.service';
import { QueryRef } from 'apollo-angular';
import { PostQueryService } from '../graphql/queries/post-query.service';
// title,slug,description,text,isPublish,auther,imgUrl,blogTypeId

@Injectable({
  providedIn: 'root'
})
export class PostService {
  search = new Subject<string>();
  constructor(
    private gQLService: GraphqlService,
    private postQuerie: PostQueryService,
    private postMutation: PostMutationService,

  ) { }


  getAll(page?, pageSize?, search?) {
    return this.gQLService.query(this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']), { page, pageSize, search })
      .valueChanges.pipe(map(response => {
        return response
      }))
  }
  getById(id): Observable<any> {
    return this.gQLService.query(this.postQuerie.postById(['title', 'description', 'text', 'auther', 'user{ name id}', 'blogType{id name}', 'slug', 'id', 'createdAt']), { id })
      .valueChanges.pipe(map(response => {
        return response
      }))
  }

  getByType(id, page?, pageSize?): Observable<any> {
    return this.gQLService.query(this.postQuerie.postByType(['blogs{title description auther user{ name id} id createdAt }', 'total']), { id, page, pageSize })
      .valueChanges.pipe(map(response => {

        return response
      }))
  }

  post(title, slug, description, isPublish, auther, blogTypeId, imgUrl, text, userId) {
    return this.gQLService.mutate(this.postMutation.addPost, { title, slug, description, text, isPublish, auther, imgUrl, blogTypeId, userId },
      (store, { data: { addBlog } }) => {

        const data: any = store.readQuery({
          query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']),

          variables: { page: 1, pageSize: 1 }
        });

        data.blogs.blogs.push(addBlog);

        //  data.blogs.total++
        store.writeQuery({ query: this.postQuerie.allPost(['blogs{title description auther user{ name id} id createdAt }', 'total']), variables: { page: 1, pageSize: 1 }, data })

        const data1: any = store.readQuery({
          query: this.postQuerie.postByType(['blogs{title description auther user{ name id} id createdAt }', 'total']),

          variables: { id: blogTypeId, page: 1, pageSize: 1 }
        });
         
         
        data1.blogs.blogs.push(addBlog);

        data1.blogs.total++
        store.writeQuery({ query: this.postQuerie.postByType(['blogs{title description auther user{ name id} id createdAt }', 'total']), variables: { id: blogTypeId, page: 1, pageSize: 1 }, data: data1 })

      }
    )

  }

  put(id, title, slug, description, isPublish, auther, blogTypeId, imgUrl, text, userId) {
    return this.gQLService.mutate(this.postMutation.updateBlog, { id, blog: { title, slug, description, text, isPublish, auther, imgUrl, blogTypeId, userId } },
      (store, { data: { updateBlog } }) => {
        const data: any = store.readQuery({
          query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total'])
        });


        data.blogs.blogs.push(updateBlog);

        store.writeQuery({ query: this.postQuerie.allPost(['blogs{title description auther user{ name id} id createdAt }', 'total']), data })
      }
    )

  }



  delete(id, page?, pageSize?) {
    return this.gQLService.mutate(this.postMutation.deleteBlog, { id },
      (store, { data: { deleteBlog } }) => {
        const data: any = store.readQuery({
          query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']),
          variables: { page, pageSize }


        });
        console.log(deleteBlog);
        

        data.blogs.blogs = data.blogs.blogs.filter(a => a.id !== deleteBlog.id);
        data.blogs.total--;


        store.writeQuery({ query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']), variables: { page, pageSize }, data })

        const data1: any = store.readQuery({
          query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']),
          variables: { page: 1, pageSize: 1 }


        });

        data1.blogs.blogs = data1.blogs.blogs.filter(a => a.id !== deleteBlog.id);
        data1.blogs.total--;


        store.writeQuery({ query: this.postQuerie.allPost(['blogs{title description  auther user{ name id} id createdAt }', 'total']), variables: { page: 1, pageSize: 1 }, data: data1 })
      
        const data2: any = store.readQuery({
          query: this.postQuerie.postByType(['blogs{title description auther user{ name id} id createdAt }', 'total']),

          variables: { id: deleteBlog.blogType.id, page: 1, pageSize: 1 }
        });

        data2.blogs.blogs = data2.blogs.blogs.filter(a => a.id !== deleteBlog.id);
        data2.blogs.total--;


        store.writeQuery({ query: this.postQuerie.postByType(['blogs{title description auther user{ name id} id createdAt }', 'total']),variables: { id: deleteBlog.blogType.id, page: 1, pageSize: 1 }, data: data2 })


      }
    );
  }


}

  // blog{title description auther id createdAt user{ name id}