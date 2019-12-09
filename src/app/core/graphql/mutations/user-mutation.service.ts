import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
@Injectable({
    providedIn: 'root'
})

export class UserMutationService {
    constructor() { }
    signup = gql`
        mutation  addUser($name:String,$email:String,$password:String){
            addUser(name:$name,email:$email,password:$password){
              
                email
              
            }
        }
    `;

    login = gql`
mutation  loginUser($email:String,$password:String){
    loginUser(email:$email,password:$password){
        success
        status
        infoId
        email
        token
        roles
    }
}
`;

    updateRoleUser = gql`
        mutation updateRoleUser($id:ID, $role:String,$isAdmin:Boolean){
        updateRoleUser(id:$id,role:$role,isAdmin:$isAdmin){
            id
            name
            roles{name id} 
            email
            isAdmin
        }
    }

`

    deleteUser = gql`
        mutation deleteUser($id:ID){
            deleteUser(id:$id){
                id
                }
    }   

`;
}