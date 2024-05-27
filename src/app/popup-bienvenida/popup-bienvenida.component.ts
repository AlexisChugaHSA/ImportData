import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-bienvenida',
  templateUrl: './popup-bienvenida.component.html',
  styleUrls: ['./popup-bienvenida.component.css']
})
export class PopupBienvenidaComponent {
  public nombre_usuario!:any;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private _router: Router,
    public dialogRef: MatDialogRef<PopupBienvenidaComponent>,
    private router: Router
  ) {
    this.nombre_usuario=this.localStorageService.get('nombre_usuario');
    this.dialogRef.backdropClick().subscribe(() => {
      this.redirect();
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
  login(){
    this._router.navigate(['/login']);
    this.closeDialog()
  }
  redirect(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  }
