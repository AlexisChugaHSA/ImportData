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
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import { EmailService } from '../services/email.service';
import { PopupBienvenidaComponent } from '../popup-bienvenida/popup-bienvenida.component';
import { PopupErrorNewUsuarioComponent } from '../popup-error-new-usuario/popup-error-new-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user!:Usuario;
  public usuarioG=new Usuario(0,"","","");
  public login:any="";
  public bandera=false;
  public mensajeAlert="";
  public tokenUsado=false;
  public personaG=new Persona(0,0,0,0,"","","","");
  public mensajeNoEncontrado="EL usuario o la contraseña ingresados son incorrectos";
  public mensajeTokenUsado="Este usuario ha iniciado sesion en otra maquina. Desea ingresar en esta maquina?"
  constructor(
    private dialog: MatDialog,
    private _authService:AuthService,
    private _personaService: PersonaService,
    private _userService: UsuarioService,
    private _authguard:AuthGuard,
    private _route:ActivatedRoute,
    private _emailService:EmailService,
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
      const data:any=response;
      const dialogRef = this.dialog.open(PopupCargandoComponent);
      this._userService.comprobarUsuario(data._tokenResponse.email).subscribe(
        result =>{
          const user:any=result;
          if(user.Mensaje="SI" && user.id_usuario){
            this.usuarioG.id_usuario=user.id_usuario
            this.usuarioG.usuario=data._tokenResponse.email;
            this.usuarioG.password="nsywraO76m";
            dialogRef.close()
            this.loginGoogleSi(this.usuarioG);
            
          }
          else{dialogRef.close();this.guardarDatosusuario(data)}
        },
        error=>{
          console.log(error)
          dialogRef.close();
          this.guardarDatosusuario(data);
          
        }  )  
      
    })
    .catch(error => console.log(error) )
  }
  loginGoogleSi(user:Usuario){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._authService.loginUsuarioSi(user).subscribe(
      result =>{
        this.login=result;
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.localStorageService.get('token'));
        if(this.login.mensaje==="OKSI"){
          this._router.navigate(['/home']);
          dialogRef.close();
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
        dialogRef.close()
        //console.log(error)
      }  ) 
  }
  guardarDatosPersona(data:any){
    const dialogRef=this.dialog.open(PopupCargandoComponent);
    this.personaG.nombre=data._tokenResponse.firstName;
    this.personaG.apellido=data._tokenResponse.lastName;
    this.personaG.correo=data._tokenResponse.email;
    if(data.user.phoneNumber){
      this.personaG.telefono=data.user.phoneNumber;
    }else{
      this.personaG.telefono="0";
    }
    this._personaService.addPersona(this.personaG).subscribe(
      result => {
        this.enviarCorreoBienvenida();
        console.log("Persona registrada");
        this._authService.loginUsuario(this.usuarioG).subscribe(
          result =>{
            this.login=result;
            this.localStorageService.set('id_usuario',this.login.id_usuario);
            this.localStorageService.set('token',this.login.token);
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
            dialogRef.close();
            //console.log(error)
          }  ) 
  })}
  
  guardarDatosusuario(data:any){
    const dialogRef2=this.dialog.open(PopupCargandoComponent);
    this.usuarioG.usuario=data._tokenResponse.email;
    this.usuarioG.password="nsywraO76m"
    this._userService.addUsuario(this.usuarioG).subscribe(
      result => {
            console.log("Usuario registrado")
            const userR:any=result;
            this.personaG.id_usuario=userR.id_usuario;
            dialogRef2.close();
            this.guardarDatosPersona(data);
          },
      error => {
            dialogRef2.close();
            const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
          })
  }

  enviarCorreoBienvenida(){
    this._emailService.enviarEmailBienvenida(this.usuarioG.usuario).subscribe(
      result => {
        console.log(result)
          },
          error => {
            console.log(error)
          }
        )
   }
  

  ocultarMensajeCon(){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._authService.loginUsuarioSi(this.user).subscribe(
      result =>{
        this.login=result;
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.localStorageService.get('token'));
        if(this.login.mensaje==="OKSI"){
          this._router.navigate(['/home']);
          dialogRef.close();
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
        dialogRef.close()
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
          dialogRef.close();
        }
      },
      error=>{
        dialogRef.close();
        //console.log(error)
      }  ) 
  }
}