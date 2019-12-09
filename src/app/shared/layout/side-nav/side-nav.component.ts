import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostTypeService } from 'src/app/core/services/post-type.service';
import { IPostType } from 'src/app/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit,OnDestroy {
  panelOpenState = false;
  subscription=new Subscription();
  constructor(private pTS:PostTypeService) { }
  postTypes:IPostType[]=[];
  ngOnInit() {
  // this.subscription.add( this.pTS.getAll().valueChanges.subscribe((response)=>{
  //   this.postTypes=response.data.blogTypes;
  //   console.log(response.loading);
   
  // })
  // )
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
}

