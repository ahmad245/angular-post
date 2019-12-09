import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {
 toggle=false;
  constructor() { }

  ngOnInit() {
  }
  toggleColor(){
    this.toggle=!this.toggle;
  }

}
