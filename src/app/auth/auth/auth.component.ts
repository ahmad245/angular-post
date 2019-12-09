import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ContentChild, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<AuthComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public dialogRef:MatDialogRef<AuthComponent>,
    
    public fb: FormBuilder
  ) { 

    this.createForm=this.fb.group({
      _id:[''],
  
        name:['',[Validators.required,Validators.minLength(1)]],
        username:['',[Validators.required,Validators.minLength(3),Validators.email]],
        // phone:['',[Validators.required,Validators.minLength(3)]],
        password:['',[Validators.required,Validators.minLength(6)]],
        // confirmPassword:['',Validators.required],
        // address:['',[Validators.required,Validators.minLength(1)]],
        // gender:['',Validators.required]
        
      });
  }

  ngOnInit() {
    console.log(this.data.type);
    ;
    // this._matFormField._control = this._control;
  }
  onClose(){
    this.dialogRef.close();
    this.createForm.reset();
   }
  onSubmit(){
    let user={
        name:this.createForm.value.name,
        email:this.createForm.value.username,
        password:this.createForm.value.password
    }
    this.uS.attemptAuth(this.data.type,user).subscribe((data)=>{
    
      
    })
  }
 
}
