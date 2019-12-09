import { IPost } from './../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 post:IPost;
  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.post=data.post.data.blog;
      console.log(this.post);
      
    })
  }

}
