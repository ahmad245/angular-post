import { IUser } from './user';

export interface IComment{
    id:string;
    rating:number;

    message:string;

    userId: IUser;
}