import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostTypeService } from 'src/app/core/services/post-type.service';
import { IPostType } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-type',
  templateUrl: './post-type.component.html',
  styleUrls: ['./post-type.component.scss']
})
export class PostTypeComponent implements OnInit,OnDestroy {
  subscription = new Subscription();
  type:string;
  constructor(
    private pTS: PostTypeService,
    private route:ActivatedRoute,) { }
  postTypes: IPostType[] = [];
  ngOnInit() {
    this.subscription.add(
      this.pTS.getAll().subscribe((response) => {
      this.postTypes = response.blogTypes;
    })
    );
    this.subscription.add( this.route.queryParamMap.subscribe((data)=>{
      this.type= data.get('type');
    
      
    })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}