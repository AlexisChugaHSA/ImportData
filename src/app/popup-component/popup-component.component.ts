import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
  <div class="popup-container">
  <h1 class="popup-title">{{ data.title }}</h1>
  <h1 class="popup-title">{{ data.detail }}</h1>
  <h1 class="popup-title">{{ data.total }}</h1>

</div>

  `,
  styleUrls: ['./popup-component.component.css']

})
export class PopupComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.closeDialog();
    }, 3000);
  }
  
}
