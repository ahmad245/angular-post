import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
    providedIn: 'root'
})

// title: { type: GraphQLString },
// slug: { type: GraphQLString },
// description: { type: GraphQLString },
// text: { type: GraphQLString },
// isPublish: { type: GraphQLBoolean },
// auther: { type: GraphQLString },
// userId:{type:GraphQLID},
// blogTypeId:{type:GraphQLID},
// imgUrl:{ type: GraphQLString },
// favorited: {type:GraphQLBoolean},
// favoritesCount: {type:GraphQLInt},

export class PostMutationService {
    constructor() { }
    addPost = gql`
        mutation  addBlog($title:String,$slug:String,$description:String,$isPublish:Boolean,$auther:String,$blogTypeId:String,$imgUrl:String,$text:String,$userId:String){
            addBlog(title:$title,slug:$slug,description:$description,isPublish:$isPublish,auther:$auther,blogTypeId:$blogTypeId,imgUrl:$imgUrl,text:$text,userId:$userId){
                title
                slug
                description               
                isPublish
                auther              
                imgUrl
                text
             
            }
        }
    `;


    deleteBlog = gql`
         mutation deleteBlog($id:ID){
            deleteBlog(id:$id){
                id
                blogType{id}
            }
         }   
    
        `;

    updateBlog=gql`
        mutation updateBlog($id:ID, $blog:BlogUpdate){
            updateBlog(id:$id,blog:$blog){
                id
                title
                slug
                description               
                isPublish
                auther              
                imgUrl
                text
            }
     }
    
    `




}