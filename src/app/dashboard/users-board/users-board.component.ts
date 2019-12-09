import { IRoles } from './../../core/models/roles';
import { IPost } from './../../core/models/post';
import { Component, OnInit, ContentChild, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { RolesComponent } from '../roles/roles.component';
import { DialogService } from 'src/app/core/services/dialog.service';

export interface PeriodicElement {
  name: string;
  blogs: IPost[];
  email: number;
  roles: IRoles;
 
}
@Component({
  selector: 'app-users-board',
  templateUrl: './users-board.component.html',
  styleUrls: ['./users-board.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersBoardComponent implements OnInit {
  value = 'Search';
  displayedColumns:string[]=["name","email","roles", "isAdmin","actions"];

  expandedElement: PeriodicElement | null;
 subscription=new Subscription();
 pageSize = 1;
  totalItem = 0;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];

  isLoading = true;
superAdmin="superAdmin";
  listData:MatTableDataSource<any>;
 
  @ViewChild('callAPIDialog', {static: false}) callAPIDialog: TemplateRef<any>;
  @ContentChild(MatSort,{ read: true, static: false }) sort: MatSort;
  @ContentChild(MatPaginator,{ read: true, static: false }) paginator: MatPaginator;
  constructor( public dialog:MatDialog,
    public toastr:ToastrService,
    public dialogService: DialogService,
    public uS:UserService,
    public pS:PostService,

    private route:ActivatedRoute
    ) {
    toastr.toastrConfig.positionClass= "toast-top-full-width";
   }

   ngOnInit() {
   
  
   
    this.isLoading=true;

   this.subscription.add( 
    this.uS.getAll(this.page, this.pageSize)
    .subscribe((response) => { 
      console.log(response.data.users.users);
      
          this.listData=new MatTableDataSource(response.data.users.users);
          this.listData.sort=this.sort;
          this.isLoading= response.loading;
          this.totalItem=response.data.users.total;

     })
     
 
       
       )
  

   
  }

  openDialog(){
    
    
    
  
   
  }  
  update(row){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data={user:row}
    // dialogConfig.data={type:type};
    //dialogConfig.restoreFocus=true;
    this.dialog.open(RolesComponent, dialogConfig);

    
  }

  delete(row) {
    this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res) => {
      console.log(res);
      
      if (res) {
        this.uS.delete(row.id,this.page,this.pageSize).subscribe(
                res => {
              
                this.toastr.success('Votre matière a été delete avec succès.', 'Success');
              },
              err => {
               
                this.toastr.error(err.message, 'Error occured');

              })
    
            }
    })

  }



  clear(){
    this.value='';
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
        this.uS.getAll(this.page, this.pageSize)
      .subscribe((response) => { 
      
        this.listData=new MatTableDataSource(response.data.users.users);
        this.listData.sort=this.sort;
        this.isLoading= response.loading;
        this.totalItem=response.data.users.total;


   })
     )

  }

 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
