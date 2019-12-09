import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
    private uS:UserService,
    public fb: FormBuilder
  ) {
    this.createForm=this.fb.group({
      _id:[''],
      
        name:['',[Validators.required,Validators.minLength(1)]],
        bio:['',[Validators.required,Validators.minLength(1)]],
        urlImg:['',[Validators.required,Validators.minLength(1)]],
        username:['',[Validators.required,Validators.minLength(3),Validators.email]],
        phone:['',[Validators.required,Validators.minLength(3)]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',Validators.required],
        address:['',[Validators.required,Validators.minLength(1)]],
        gender:['',Validators.required]
        
      });
   }

  ngOnInit() {
  }
  logout() {
    this.uS.purgeAuth();
    this.router.navigateByUrl('/');
  }
  onSubmit(){
    
  }
}
