import { IPostType } from './post-type';
import { IUser } from './user';
import { IComment } from './comment';

export interface IPost{
    id:string;
    title:string;
    slug?:string;
    description:string;
    text?:string;
    isPublish?:boolean;
    auther:string;
    tags?:[];
    imgUrl?:string;
    createdAt:string;
    user:IUser;
    blogType?:IPostType;
    comments?:IComment;
}