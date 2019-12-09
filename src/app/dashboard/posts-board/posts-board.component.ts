import { DialogService } from './../../core/services/dialog.service';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-board',
  templateUrl: './posts-board.component.html',
  styleUrls: ['./posts-board.component.scss']
})
export class PostsBoardComponent implements OnInit {
  value = 'Search';
  displayedColumns: string[] = ["title", "description", "auther", "createdAt", "actions"];

  examName: any[] = [];
  subscription = new Subscription();
  pageSize = 1;
  totalItem = 0;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];

  isLoading = true;
  superAdmin = "superAdmin";
  listData: MatTableDataSource<any>;
  @ContentChild(MatSort, { read: true, static: false }) sort: MatSort;
  @ContentChild(MatPaginator, { read: true, static: false }) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    public toastr: ToastrService,
    public dialogService: DialogService,
    public uS: UserService,
    public pS: PostService,

    private route: ActivatedRoute
  ) {
    toastr.toastrConfig.positionClass = "toast-top-full-width";
  }

  ngOnInit() {



    this.isLoading = true;

    this.subscription.add(
      this.pS.getAll(this.page, this.pageSize)
        .subscribe((response) => {
          this.listData = new MatTableDataSource(response.data.blogs.blogs);
          this.listData.sort = this.sort;
          this.isLoading = response.loading;
          this.totalItem = response.data.blogs.total;

        })



    )



  }

  openDialog() {





  }
  update(row) {

  }

  delete(row) {
    this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res) => {


      if (res) {
        this.pS.delete(row.id, this.page, this.pageSize).subscribe(
          res => {

            this.toastr.success('Votre matière a été delete avec succès.', 'Success');
          },
          err => {

            this.toastr.error(err.message, 'Error occured');

          })

      }
    })

  }


  clear() {
    this.value = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.value.trim().toLowerCase();
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.totalItem = pageData.length;


    this.subscription.add(
      this.pS.getAll(this.page, this.pageSize)
        .subscribe((response) => {
          this.listData = new MatTableDataSource(response.data.blogs.blogs);
          this.listData.sort = this.sort;
          this.isLoading = response.loading;
          this.totalItem = response.data.blogs.total;

        })



    )


  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
