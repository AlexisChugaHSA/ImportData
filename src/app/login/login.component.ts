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
  public mensajeNoEncontrado="EL usuario o la contraseña ingresados son incorrectos";
  public mensajeTokenUsado="Este usuario ha iniciado sesion en otra maquina. Desea ingresar en esta maquina?"
  constructor(
    private _authService:AuthService,
    private _userLogService:UserLogService,
    private _authguard:AuthGuard,
    private _route:ActivatedRoute,
    private _router: Router,
    private localStorageService: LocalStorageService
  ){
    this.user=new Usuario(0,"","","");
  }


  ocultarMensajeCon(){
    this._authService.loginUsuarioSi(this.user).subscribe(
      result =>{
        console.log(result);
        this.login=result;
        console.log(this.login.mensaje);
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.login.token);
        if(this.login.mensaje==="OKSI"){
         // this._authguard.bandera=true;
          this._router.navigate(['/home']);
          this._userLogService.setUser(this.user);
          }
        else if(this.login.mensaje==="TK"){
          this.mensajeAlert=this.mensajeTokenUsado;
          this.bandera=true;
        }
        else{
          this.mensajeAlert=this.mensajeNoEncontrado
          this.bandera=true;
        }
      },
      error=>{
        console.log(error)
      }  ) 
  }
  loginUsuario(){
    this._authService.loginUsuario(this.user).subscribe(
      result =>{
        
        this.login=result;
        this.localStorageService.set('id_usuario',this.login.id_usuario);
        this.localStorageService.set('token',this.login.token);
        console.log(this.login.token);
        //console.log(this.localStorageService.get('id_usuario'))
        console.log(this.login.mensaje);
        if(this.login.mensaje==="OK"){
          this._userLogService.setUser(this.user)
          this._router.navigate(['/home']);}
        else if(this.login.mensaje==="TK"){
          this.mensajeAlert=this.mensajeTokenUsado;
          this.bandera=true;
        }
        else{
          this.mensajeAlert=this.mensajeNoEncontrado
          this.bandera=true;
        }
      },
      error=>{
        console.log(error)
      }  ) 
  }
}