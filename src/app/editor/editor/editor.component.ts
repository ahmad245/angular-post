import { IPost } from './../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../core/services/user.service';
import { PostService } from './../../core/services/post.service';
import { PostTypeService } from './../../core/services/post-type.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPostType } from 'src/app/core';
import { Subscription } from 'rxjs';
import { QuillModule } from 'ngx-quill';
interface post {
  [key: string]: any
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  createForm: FormGroup;
  postTypes: IPostType[] = [];
  userId;
  postId;



  subscription = new Subscription();
  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public pTS: PostTypeService,
    public pS: PostService,
    private uS: UserService
  ) {

    this.createForm = this.fb.group({
      _id: [''],
      title: ['', [Validators.required, Validators.minLength(1)]],
      slug: [''],
      description: ['', [Validators.required, Validators.minLength(1)]],
      text: ['', [Validators.required, Validators.minLength(1)]],
      isPublish: [],
      auther: ['', [Validators.required, Validators.minLength(1)]],
      imgUrl: ['', [Validators.required, Validators.minLength(1)]],
      tags: ['', [Validators.required, Validators.minLength(1)]],
      blogType: ['', [Validators.required]],

    })
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    if ( this.postId ) {
      this.pS.getById( this.postId ).subscribe((response) => {
        console.log(response.data.blog);

        this.createForm.patchValue({
          _id: response.data.blog.id,
          title: response.data.blog.title,
          slug: response.data.blog.slug,
          description: response.data.blog.description,
          text: response.data.blog.text,
          isPublish: response.data.blog.isPublish || false,
          auther: response.data.blog.auther,
          imgUrl: response.data.blog.imgUrl || '',
          tags: response.data.blog.tags || '',
          blogType: response.data.blog.blogType.id,
        })
      })
    }


    this.subscription.add(
      this.pTS.getAll().subscribe((response) => {
        this.postTypes = response.blogTypes;
      })
    );
    this.subscription.add(
      this.uS.currentUser.subscribe(user => {
        this.userId = user.id


      })
    );
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  onSubmit() {
    let post: post;
    post = {
      title: this.createForm.value.title,
      slug: this.createForm.value.slug,
      description: this.createForm.value.description,
      text: this.createForm.value.text,
      isPublish: this.createForm.value.isPublish,
      auther: this.createForm.value.auther,
      imgUrl: this.createForm.value.imgUrl,
      blogTypeId: this.createForm.value.blogType,
      userId: this.userId
    }
    // post.id="jjjjjjjjjjj"
    // console.log(post);
     if( this.postId ){
      console.log('update');
        this.subscription.add(
          this.pS.put(this.postId, post.title, post.slug, post.description, post.isPublish, post.auther, post.blogTypeId, post.imgUrl, post.text, post.userId)
            .subscribe(data => {
              
            })
        )
     }
     else{
       console.log('add');
       
      this.subscription.add(
        this.pS.post(post.title, post.slug, post.description, post.isPublish, post.auther, post.blogTypeId, post.imgUrl, post.text, post.userId)
          .subscribe(data => {
            
  
          })
      )
     }
    
  }


  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('files', this.fileData);

  //   this.fileUploadProgress = '0%';

  //   this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
  //     reportProgress: true,
  //     observe: 'events'  
  //   })
  //   .subscribe(events => {
  //     if(events.type === HttpEventType.UploadProgress) {
  //       this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
  //       console.log(this.fileUploadProgress);
  //     } else if(events.type === HttpEventType.Response) {
  //       this.fileUploadProgress = '';
  //       console.log(events.body);         
  //       alert('SUCCESS !!');
  //     }

  //   }) 
  // }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// Destructuring is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. That is, we can extract data from arrays and objects and assign them to variables.

// examples:

//   var introduction = ["Hello", "I" , "am", "Sarah"];
//     var [greeting, pronoun] = introduction;

//     console.log(greeting);//"Hello"
//     console.log(pronoun);//"I"

//  var [greeting,,,name] = ["Hello", "I" , "am", "Sarah"];

//     console.log(greeting);//"Hello"
//     console.log(name);//"Sarah"

//   var [,pronoun,,name] = ["Hello", "I" , "am", "Sarah"];

//     console.log(pronoun);//"I"
//     console.log(name);//"Sarah"

