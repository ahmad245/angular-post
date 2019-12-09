import { UserService } from 'src/app/core/services/user.service';
import { RolesService } from './../../core/services/roles.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements OnInit {
  createForm:FormGroup;
  role=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<RolesComponent>,
    public fb:FormBuilder,
    private rS:RolesService,
    private uS:UserService
    
  ) { 
    this.createForm=this.fb.group({  
      roles:[''],
      isAdmin:['']
    });
    
  }

  ngOnInit() {
    if(this.data){
      console.log(this.data);
      
      this.createForm.patchValue({
        roles:this.data.user.roles.id,
        isAdmin:this.data.user.isAdmin
      })
    }
 
    
     this.rS.getAll().subscribe((data)=>{
     this.role=data.Roles
       
     })
  }
  onClose(){
    this.dialog.close();
  }
  onSubmit(){
 let roleId= this.createForm.value.roles;
   console.log(roleId);
   this.uS.updateRoleUser(this.data.user.id,roleId,this.createForm.value.isAdmin).subscribe((data)=>{
    
     
   })
   
}
}
