import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { UsuarioLog } from '../models/usuarioLog';
import { GLOBAL } from '../services/global.service';
import { AuthService } from '../services/login.service'; 
import { UserLogService } from '../services/userLog.service';
import { AuthGuard } from '../services/auth.guard';
import { LocalStorageService } from 'angular-2-local-storage';
import { MatDialog } from '@angular/material/dialog';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { PopupRecuperarPasswordComponent } from '../popup-recuperar-password/popup-recuperar-password.component';
import { PopupContraseniaTemporalComponent } from '../popup-contrasenia-temporal/popup-contrasenia-temporal.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user!:Usuario;
  public login:any="";
  public bandera=false;
  public mensajeAlert="";
  public tokenUsado=false;
  public mensajeNoEncontrado="EL usuario o la contraseña ingresados son incorrectos";
  public mensajeTokenUsado="Este usuario ha iniciado sesion en otra maquina. Desea ingresar en esta maquina?"
  constructor(
    private dialog: MatDialog,
    private _authService:AuthService,
    private _userLogService:UserLogService,
    private _authguard:AuthGuard,
    private _route:ActivatedRoute,
    private _firebaseService:FirebaseService,
    private _router: Router,
    private localStorageService: LocalStorageService
  ){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._authService.getIsLoggedIn().subscribe(
      result => {
        let mensaje=result
        this.login=mensaje.login;
        if(this.login){
          //console.log(mensaje.login)
          dialogRef.close();
          this._router.navigate(['/home'])
         
        }
        else{
          dialogRef.close();
         // this._router.navigate(['/login'])
          
        }
        //console.log(mensaje.login)
      },
      error => {
        dialogRef.close();
        //this._router.navigate(['/login'])
        //console.log(error)
        this.login=false;
        
      })
    this.user=new Usuario(0,"","","");
    
  }
  olvidemiContrasenia(){
    const dialogRef2= this.dialog.open(PopupRecuperarPasswordComponent);
  }
  loginGoogle(){
    this._firebaseService.loginWithGoogle()
    .then(response=>{
      console.log(response);
      
    })
    .catch(error => console.log(error))
  }

  ocultarMensajeCon(){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._authService.loginUsuarioSi(this.user).subscribe(
      result =>{
        //console.log(result);
        this.login=result;
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.localStorageService.get('token'));
        //console.log(this.login.mensaje);

        //console.log(this.login.token);
        if(this.login.mensaje==="OKSI"){
         // this._authguard.bandera=true;
          this._router.navigate(['/home']);
          dialogRef.close();
          //this._userLogService.setUser(this.user);
          }
        else if(this.login.mensaje==="TK"){
          this.mensajeAlert=this.mensajeTokenUsado;
          this.tokenUsado=true;
          this.bandera=true;
          dialogRef.close()
        }
        else{
          this.mensajeAlert=this.mensajeNoEncontrado
          this.bandera=true;
        }
      },
      error=>{
        //console.log(error)
      }  ) 
  }
  loginUsuario(){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._authService.loginUsuario(this.user).subscribe(
      result =>{
        
        this.login=result;
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.localStorageService.get('token'));
        ////console.log(this.localStorageService.get('id_usuario'))
        //console.log(this.login.mensaje);
        if(this.login.mensaje==="OK" ){
          this._router.navigate(['/home']);
          dialogRef.close()
          }
        else if(this.login.mensaje==="TK"){
          this.mensajeAlert=this.mensajeTokenUsado;
          this.tokenUsado=true;
          this.bandera=true;
          dialogRef.close()
        }
        else{
          this.mensajeAlert=this.mensajeNoEncontrado
          this.bandera=true;
          dialogRef.close()
        }
      },
      error=>{
        //console.log(error)
      }  ) 
  }
}