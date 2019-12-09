import { IRoles } from './roles';
export interface IUser{
    id:string;
    name:string;
    email:string;
    password:string;
    isAdmin?:boolean;
    token?:string;
    roles?:IRoles
}