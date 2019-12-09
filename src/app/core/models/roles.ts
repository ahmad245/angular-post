import { IPermissions } from './permissions';

export interface IRoles{
 name:string;
 permissions?:IPermissions[];
}