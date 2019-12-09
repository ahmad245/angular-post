import { IPostConfig } from './../../../core/models/postConfig';
import { PostService } from './../../../core/services/post.service';
import { Component, OnInit, OnDestroy, Input, ContentChild, ViewChild } from '@angular/core';
import { IPost } from 'src/app/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  pageSize = 1;
  totalItem = 0;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];

  isLoading = true;
  search: any;
  @Input() postConfig: IPostConfig;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private pS: PostService,
    private route: ActivatedRoute,
  ) { }
  type: string;
  posts: IPost[] = [];
  disable = true;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
    this.pS.search.pipe(
      switchMap(value => {
        this.search = value;
        return this.pS.getAll(this.page, this.pageSize, value) 
      })
    ).subscribe((response) => {
      this.subscribePost(response)
      this.paginator.firstPage();
    })
    )


    this.subscription.add(
      this.route.queryParamMap.pipe(
          switchMap(param => {
            this.type = param.get('type');
            if (!this.type) return this.pS.getAll(this.page, this.pageSize) 
            else return this.pS.getByType(this.type, this.page, this.pageSize)
          })
        )
        
        .subscribe((response) => {
          this.subscribePost(response);
          this.paginator.firstPage();
        })
    );


  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.totalItem = pageData.length;

    if (this.search) {
      this.pS.getAll(this.page, this.pageSize, this.search) 
        .subscribe((response) => { this.subscribePost(response) })
      return;
    }
    if (this.type) {
      this.pS.getByType(this.type, this.page, this.pageSize)
        .subscribe((response) => { this.subscribePost(response) })
      return;
    }
    else {
      this.pS.getAll(this.page, this.pageSize)
        .subscribe((response) => { this.subscribePost(response) })
    }

  }
  subscribePost(response) {
    this.posts = response.data.blogs.blogs;
    this.totalItem = response.data.blogs.total;
    this.isLoading = response.loading;
    
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

// this.pS.search.subscribe((va) => {
//   this.search = va;
//   this.pS.getAll(this.page, this.pageSize, va)
//     .subscribe((response) => {
//       this.subscribePost(response)
//       this.paginator.firstPage();
//     })
// })