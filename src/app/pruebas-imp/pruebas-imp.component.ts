import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { EmailService } from '../services/email.service';
import { PersonaService } from '../services/persona.service';
import { Usuario } from '../models/usuario';
import { Persona } from '../models/persona';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas-imp.component.html',
  styleUrls: ['./pruebas-imp.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PruebasImpComponent {
  public usuario!: Usuario;
  public persona!: Persona;
 constructor(private _usuarioService: UsuarioService,
  private _emailService: EmailService,
  private _personaService: PersonaService
 ){
  this.usuario = new Usuario(45, "", "","")
 }
 obtenerCorreo(){
      this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
        result => {
          this.persona = <Persona>result;
            },
            error => {
              //console.log(error)
            }
          )
 }
 enviarCorreoBienvenida(){
  this._emailService.enviarEmailBienvenida(this.persona.correo).subscribe(
    result => {
      console.log(result)
        },
        error => {
          //console.log(error)
        }
      )
 }
}