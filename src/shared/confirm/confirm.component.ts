import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  public dialogRef: MatDialogRef<ConfirmComponent> = inject(MatDialogRef)
  public data:string|null = inject(MAT_DIALOG_DATA)
  

}
