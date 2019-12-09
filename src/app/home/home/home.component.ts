import { IPostConfig } from './../../core/models/postConfig';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config:IPostConfig={};
  createForm;
  isSubmitting=false;
  constructor(
    private route:ActivatedRoute,
    public fb: FormBuilder
  ) { 
    this.createForm=this.fb.group({
 
  
        name:['',[Validators.required,Validators.minLength(1)]],
        
      });
  }
  

  ngOnInit() {
    
  }

}
