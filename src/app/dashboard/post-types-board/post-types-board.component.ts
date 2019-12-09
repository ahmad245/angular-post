import { PostTypeService } from './../../core/services/post-type.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, group, query, style, animate, stagger, animateChild, useAnimation } from '@angular/animations';
import { fadeInAnimation, bounceOutLeftAnimation } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-types-board',
  templateUrl: './post-types-board.component.html',
  styleUrls: ['./post-types-board.component.scss'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@todoAnimation',
            stagger(200, animateChild()),{optional:true})
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '2s'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: '#ef5350' }),
        animate(500),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ]
})
export class PostTypesBoardComponent implements OnInit ,OnDestroy {
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  postTypes=[];
subscription=new Subscription();
  constructor(
    public toastr:ToastrService,
    private pTS:PostTypeService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.pTS.getAll().subscribe((response) => {
      this.postTypes = response.blogTypes;
    })
    );
  }
    
  addItem(input: HTMLInputElement) {
    if(!input.value){
      return;
    }
    let qT={name:input.value};
    this.subscription.add(   
      this.pTS.post(qT.name).subscribe((data)=>
     { if(data){
        this.postTypes.push(data);
        input.value = '';
        this.toastr.success('Votre matière a été créer avec succès.', 'Success');
      }
      err=> {
        console.log('Error occured:' , err);
        this.toastr.error(err.message, 'Error occured');}}
      
    ))
 
     
  }

  removeItem(item) {

    // this.subscription.add(
    //     this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res)=>{
    //   if(res){
    //     this.questionService.deleteQuestionType(item._id).subscribe(
    //       res => {
    //         let result=this.cT.find(el=>el._id==item._id);
    //         let index = this.cT.indexOf(result);
    //         this.cT.splice(index, 1);
    //         this.toastr.success('Votre matière a été delete avec succès.', 'Success');
          
    //       },
    //       err => {
    //         console.log('Error occured:' , err);
    //         this.toastr.error(err.message, 'Error occured');
           
    //       });
    //   }
    // }))
  }

  animationStarted($event) { }
  animationDone($event) { }

}
