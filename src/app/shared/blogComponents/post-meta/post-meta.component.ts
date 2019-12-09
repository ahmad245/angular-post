import { Component, OnInit, Input } from '@angular/core';
import {  IPost } from 'src/app/core';

@Component({
  selector: 'app-post-meta',
  templateUrl: './post-meta.component.html',
  styleUrls: ['./post-meta.component.scss']
})
export class PostMetaComponent implements OnInit {
  @Input() post:IPost;
  constructor() { }

  ngOnInit() {
  }

}
