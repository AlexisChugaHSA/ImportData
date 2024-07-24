import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { EmailService } from '../services/email.service';
import { PopupContraseniaTemporalComponent } from '../popup-contrasenia-temporal/popup-contrasenia-temporal.component';


@Component({
  selector: 'app-popup-recuperar-password',
  templateUrl: './popup-recuperar-password.component.html',
  styleUrls: ['./popup-recuperar-password.component.css']
})
export class PopupRecuperarPasswordComponent {
  public usuario:string="";
  public user!:any;
  public bandera=false;
  public tokenUsado=true;
  public mensajeAlert="El usuario no ha sido encontrado, inténtelo de nuevo.";
  constructor(
    private dialog: MatDialog,
    private _userService: UsuarioService,
    private _emailServicer: EmailService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private _router: Router,
    public dialogRef: MatDialogRef<PopupRecuperarPasswordComponent>
  ) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  recuperarContrasenia(){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._userService.comprobarUsuario(this.usuario).subscribe(
      result =>{
        this.user=result;
        if(this.user.Mensaje="SI" && this.user.id_usuario){
          this.closeDialog()
          this._emailServicer.enviarEmailRestaurarContrasenia(this.user.id_usuario,this.usuario).subscribe(
            result=>{
                console.log(result)
                const dialogRef3= this.dialog.open(PopupContraseniaTemporalComponent);
                dialogRef.close()
              }
          )
        }
        else{this.bandera=true; dialogRef.close()}
      },
      error=>{
        console.log(error)
        this.bandera=true;
        dialogRef.close()
      }  )   
    
  }
  clearLocalStorage(): void {
    localStorage.clear();
  }
}


