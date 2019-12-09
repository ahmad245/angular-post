import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from './../../core/services/post.service';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable()
export class PostResolverService implements Resolve<IPost> {
  constructor(
    private pS:PostService,
    private router:Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any> {
   return this.pS.getById(route.paramMap.get('id'))
   .pipe(take(1),
     catchError((err)=> this.router.navigateByUrl('/post')));
  }

  

}
