import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }
   openDialog(msg){
  return this.dialog.open(ConfirmDialogComponent,{
     width:'360px',
     panelClass: 'confirm-dialog-container',
     disableClose:true,
     position:{top:'10px'},
     data:{
       message:msg
     }

   })
  }

}
