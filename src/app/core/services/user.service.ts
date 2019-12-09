import { GraphqlService } from './../graphql/graphql.service';
import { Injectable } from '@angular/core';
import { UserQueryService } from '../graphql/queries/user-query.service';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { IUser } from '..';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { UserMutationService } from '../graphql/mutations/user-mutation.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isAdmindSubject = new BehaviorSubject<boolean>(false);
  public isAdmin = this.isAuthenticatedSubject.asObservable();


  private isSuperAdmindSubject = new BehaviorSubject<boolean>(false);
  public isSuperAdmin = this.isSuperAdmindSubject.asObservable();

  private isWriterdSubject = new BehaviorSubject<boolean>(false);
  public isWriter = this.isWriterdSubject.asObservable();

  private isUpdaterSubject = new BehaviorSubject<boolean>(false);
  public isUpdater = this.isUpdaterSubject.asObservable();

  private isDeleterSubject = new BehaviorSubject<boolean>(false);
  public isDeleter = this.isDeleterSubject.asObservable();

  constructor(
    private gQLService: GraphqlService,
    private userQuerie: UserQueryService,
    private userMutation: UserMutationService,
    private jwtService: JwtService

  ) { }

  getUsersByFragment(): QueryRef<any> {
    return this.gQLService.query(this.userQuerie.allUsersByFragment);
  }
  
  getAll(page?, pageSize?): Observable<any> {
    return this.gQLService.query(this.userQuerie.allUser(['users{name roles{name id} id email isAdmin blogs{title}}','total']),{ page, pageSize})
    .valueChanges.pipe(map(response => {
      return response
    }))
  }
  getById(id) {
    return this.gQLService.query(this.userQuerie.userById(['name']), { id })
  }
  getMe(): Observable<any> {
    return this.gQLService.query(this.userQuerie.me(['name', 'roles{name}', 'id', 'email', 'isAdmin']))
      .valueChanges.pipe(map(response => {
        return response
      }))
  }
  login(email, password) {
    return this.gQLService.mutate(this.userMutation.login, { email, password })
  }
  signUp(name, email, password) {
    return this.gQLService.mutate(this.userMutation.signup, { name, email, password })
  }

  updateRoleUser(id,role,isAdmin){
    return this.gQLService.mutate(this.userMutation.updateRoleUser,{id,role,isAdmin},
      (store,{data:{updateRoleUser}}) => {       
        const data: any = store.readQuery({
          query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total'])
        });
       
       data.users.users.push(updateRoleUser);

       store.writeQuery({ query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']), data })
      }
      )
  }
  delete(id,page?, pageSize?){
    return this.gQLService.mutate(this.userMutation.deleteUser,{id},
      (store,{data:{deleteUser}}) => {       
        const data: any = store.readQuery({
          query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']),
          variables:{page,pageSize}
         
          
        });
        console.log(  deleteUser);
        data.users.users= data.users.users.filter(a=>a.id !== deleteUser.id);
        data.users.total--;
      console.log( data.users);
      

        store.writeQuery({ query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']),variables:{page,pageSize}, data })
      });
  }
  /////////////////////////////////////////////////////////////////////

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  populate() {

    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.getMe().subscribe(
        response => { return this.setAuth(response.data.me) },

        // data => this.setAuth(data.user),
        err => {
         
          this.purgeAuth()
        }
      );

    } else {

      //  Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user) {
  
   
    // Save JWT sent from server in localstorage
    if (user.token) {
      this.jwtService.saveToken(user.token);
    }
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

    if (user.isAdmin) {
      this.isAdmindSubject.next(true);
    }

    if (user.roles.name === "superAdmin") {
     
      
      this.isSuperAdmindSubject.next(true);
    }

    if (user.roles.name === "writer" || user.roles.name === "superAdmin") {
    
      this.isWriterdSubject.next(true);
    }

   else if (user.roles.name === "updater" || user.roles.name === "superAdmin") {
     
      this.isUpdaterSubject.next(true);
    }

   else   if (user.roles.name === "deleter" || user.roles.name === "superAdmin") {
     
      this.isDeleterSubject.next(true);
    }
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as IUser);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.isAdmindSubject.next(false);
    this.isWriterdSubject.next(false);
    this.isSuperAdmindSubject.next(false);
    this.isUpdaterSubject.next(false);
    this.isDeleterSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<IUser> {

    if (type === 'login') {
      return this.login(credentials.email, credentials.password).pipe(
        map(data => {

          if (!data.errors) this.setAuth(data.data.loginUser); return data;
        })
      )
    }
    else {
      return this.signUp(credentials.name, credentials.email, credentials.password).pipe(
        map(data => {
          return data;
        })
      )
    }

  }

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }

}









// export class UserService extends Query<> {
//   userProperty=['id','name'];
//   id:'5d7fc84bd7ebcc3a60c6d8b5';
//   userQuery=gql`
//   query user($id:String!){
//    user(id:$id){
//   name
//    }
//   }`
//    constructor(private apollo:Apollo) {

//     }

//     getAll(id){
//       this.apollo.watchQuery({
//         query:this.userQuery
//         ,variables:{id:'5d7fc84bd7ebcc3a60c6d8b5'}
//       }).valueChanges
//       .subscribe((result)=>{
//         console.log(result.data);

//       });
//     }
//  }