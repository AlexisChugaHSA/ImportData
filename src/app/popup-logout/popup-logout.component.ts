import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-logout',
  templateUrl: './popup-logout.component.html',
  styleUrls: ['./popup-logout.component.css']
})
export class PopupLogoutComponent {
  public usuario: Usuario = new Usuario(0, "", "","");
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private _router: Router,
    public dialogRef: MatDialogRef<PopupLogoutComponent>
  ) {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  logout(){
    this.authService.logout(this.usuario.id_usuario).subscribe(
      result=>{
          console.log(result);
          this._router.navigate(['/login']);
          this.closeDialog()
        },
        error=> {
          console.log(error)
        }
      )
  }
}
