import { PostTypeService } from 'src/app/core/services/post-type.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-editor-post-type',
  templateUrl: './editor-post-type.component.html',
  styleUrls: ['./editor-post-type.component.scss']
})
export class EditorPostTypeComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef:MatDialogRef<EditorPostTypeComponent>,
    public pTS:PostTypeService,
    
    public fb: FormBuilder
  ) { 

    this.createForm=this.fb.group({
      _id:[''],
  
        name:['',[Validators.required,Validators.minLength(1)]],
       
      });
  }

  ngOnInit() {
   
  }
  onClose(){
    this.dialogRef.close();
    this.createForm.reset();
   }
  onSubmit(){
    let postType=this.createForm.value.name;
     this.pTS.post(postType).subscribe(data=>{
       console.log(data);
       
     })
    
  }

}