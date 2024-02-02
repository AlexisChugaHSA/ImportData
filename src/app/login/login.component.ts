import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { UsuarioLog } from '../models/usuarioLog';
import { GLOBAL } from '../services/global.service';
import { AuthService } from '../services/login.service'; 
import { UserLogService } from '../services/userLog.service';
import { AuthGuard } from '../services/auth.guard';

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
    private _router: Router
  ){
    this.user=new Usuario(0,"","","");
  }


  ocultarMensajeCon(){
    this._authService.loginUsuarioSi(this.user).subscribe(
      result =>{
        console.log(result);
        this.login=result;
        console.log(this.login.mensaje);
        if(this.login.mensaje==="OKSI"){
          this._authguard.bandera=true;
          this._router.navigate(['/dashboard']);
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
  onSubmit(){
    console.log(this.user);
    this._authService.loginUsuario(this.user).subscribe(
      result =>{
        console.log(result);
        this.login=result;
        console.log(this.login.mensaje);
        if(this.login.mensaje==="OK"){
          this._userLogService.setUser(this.user)
          this._router.navigate(['/dashboard']);}
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