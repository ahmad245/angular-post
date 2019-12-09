import { PostService } from './../../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  createForm;
  isSubmitting=false;
  constructor( 
    public fb: FormBuilder,
    private pS:PostService
    ) { 
      this.createForm=this.fb.group({
   
    
          name:['',[Validators.required,Validators.minLength(1)]],
          
        });
    }
  ngOnInit() {
  }
  onSubmit(){
 this.pS.search.next(this.createForm.value.name);
  }

}
