import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../services/global.service';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';
import { PaisService } from '../services/pais.service';
import { CiudadService } from '../services/ciudad.service';
import { Direccion } from '../models/direccion';
import { DireccionService } from '../services/direccion.service';
import { Empresa } from '../models/empresa';
import { EmpresaService } from '../services/empresa.service';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupBienvenidaComponent } from '../popup-bienvenida/popup-bienvenida.component';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { EmailService } from '../services/email.service';
import { PopupErrorNewUsuarioComponent } from '../popup-error-new-usuario/popup-error-new-usuario.component';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  public user!: Usuario;
  public rpassword: string = "";
  public bandera: boolean = false;
  public persona= new Persona(0,0,0,0,"","","","");
  public pais!: Pais;
  public ciudad!: Ciudad;
  public paises!: any;
  public ciudades!: any;
  public usuario!: any;
  public paisSeleccionadoP!: Pais;
  public ciudadSeleccionadaP!: Ciudad;
  public paisSeleccionadoE!: Pais;
  public ciudadSeleccionadaE!: Ciudad;
  public direccionP!: Direccion;
  public direccionP2!: any;
  public direccionE!: Direccion;
  public direccionE2!: any;
  public empresa!: Empresa;
  public empresa2!: any;
  public login=false;
  public bra_terminos=false;
  public resultUser!:any;
  public correoUsado:boolean=false;
  public mensajeAlert="Ya existe un usuario registrado con este correo.";


  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private _usuarioService: UsuarioService,
    private _paisService: PaisService,
    private _ciudadService: CiudadService,
    private _empresaService: EmpresaService,
    private _direccionService: DireccionService,
    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private _emailService:EmailService
  ) {
    this.user = new Usuario(0, "", "", "");
    this.persona = new Persona(0, 0, 0, 0, "", "", "", "");
    this.direccionP = new Direccion(0, 0, 0);
    this.direccionE = new Direccion(0, 0, 0);
    this.empresa = new Empresa(0, 1, "", 0, "", "", "")
  }

  irALogin(){
    this._router.navigate(['/login']);
  }
  nextForm1() {
    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form2');
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn2');
    this.renderer.setStyle(form1, 'display', 'none');
    this.renderer.setStyle(form2, 'display', 'block');
    this.renderer.setStyle(btn1, 'display', 'none');
    this.renderer.setStyle(btn2, 'display', 'block');
    this.user.usuario = this.persona.correo
  }

  nextForm2() {
    const form2 = document.querySelector('#form1');
    const form3 = document.querySelector('#form3');
    const btn2 = document.querySelector('#btn1');
    const btn3 = document.querySelector('#btn3');
    this.renderer.setStyle(form2, 'display', 'none');
    this.renderer.setStyle(form3, 'display', 'block');
    this.renderer.setStyle(btn2, 'display', 'none');
    this.renderer.setStyle(btn3, 'display', 'block');
  }

  prevForm2() {
    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form3');
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn3');
    this.renderer.setStyle(form1, 'display', 'block');
    this.renderer.setStyle(form2, 'display', 'none');
    this.renderer.setStyle(btn1, 'display', 'block');
    this.renderer.setStyle(btn2, 'display', 'none');
  }
  prevForm3() {
    const form2 = document.querySelector('#form2');
    const form3 = document.querySelector('#form3');
    const btn2 = document.querySelector('#btn2');
    const btn3 = document.querySelector('#btn3');
    this.renderer.setStyle(form2, 'display', 'block');
    this.renderer.setStyle(form3, 'display', 'none');
    this.renderer.setStyle(btn2, 'display', 'block');
    this.renderer.setStyle(btn3, 'display', 'none');
  }
  ocultarMensajeCon() {
    this.bandera = false;
  }


  onCountryPSelectionChange(country: Pais) {
    this.paisSeleccionadoP = country;
    this._ciudadService.getCiudadesP(this.paisSeleccionadoP.id_pais).subscribe(
      result => {
        this.ciudades = result;
      },
      error => {
        //console.log(error);
      })
    //console.log(country);
    this.direccionP.id_pais = this.paisSeleccionadoP.id_pais

  }
  onCityPSelectionChange(city: Ciudad) {
    this.ciudadSeleccionadaP = city;
    //console.log(this.ciudadSeleccionadaP);
    this.direccionP.id_ciudad = this.ciudadSeleccionadaP.id_ciudad
  }
  onCountryESelectionChange(country: Pais) {
    this.paisSeleccionadoE = country;
    this._ciudadService.getCiudadesP(this.paisSeleccionadoE.id_pais).subscribe(
      result => {
        this.ciudades = result;
      },
      error => {
        //console.log(error);
      })
    //console.log(country);
    this.direccionE.id_pais = this.paisSeleccionadoE.id_pais
  }
  onCityESelectionChange(city: Ciudad) {
    this.ciudadSeleccionadaE = city;
    //console.log(this.ciudadSeleccionadaE);
    this.direccionE.id_ciudad = this.ciudadSeleccionadaE.id_ciudad
  }
  onSubmit() {
    //agregar direccion persona
    const dialogRef1 = this.dialog.open(PopupCargandoComponent);
                    //agregar usuario
                    this._usuarioService.addUsuario(this.user).subscribe(
                      result => {
                        this.usuario = result
                        this.persona.id_usuario = this.usuario.id_usuario
                        console.log("Usuario registrado")
                        //agregar persona
                        //console.log(this.persona);
                        this.localStorageService.set('nombre_usuario',this.persona.nombre);
                        this._personaService.addPersona(this.persona).subscribe(
                          result => {
                              dialogRef1.close();
                              const dialogRef = this.dialog.open(PopupBienvenidaComponent);
                              this.enviarCorreoBienvenida();
                              dialogRef.afterClosed().subscribe(() => {
                              });
                            console.log("Persona registrada")
                          },
                          error => {
                            const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
                            //console.log(error)
                          })},
                          error => {
                            const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
                            //console.log(error)
                          })}
    /*
    this._direccionService.addDireccion(this.direccionP).subscribe(
      result => {
        this.direccionP2 = result
        this.persona.id_direccion = this.direccionP2.id_direccion
        console.log("Direccion de persona registrada")
        //agregar direccion empresa
        this._direccionService.addDireccion(this.direccionE).subscribe(
          result => {
            this.direccionE2 = result
            this.empresa.direccion = this.direccionE2.id_direccion
            console.log("Direccion de empresa registrada")
            //agregar empresa
            this._empresaService.addEmpresa(this.empresa).subscribe(
              result => {
                this.empresa2 = result
                this.persona.id_empresa = this.empresa2.id_empresa
                console.log("Empresa registrada")
                //agregar usuario
                this._usuarioService.addUsuario(this.user).subscribe(
                  result => {
                    this.usuario = result
                    this.persona.id_usuario = this.usuario.id_usuario
                    console.log("Usuario registrado")
                    //agregar persona
                    //console.log(this.persona);
                    this.localStorageService.set('nombre_usuario',this.persona.nombre);
                    this._personaService.addPersona(this.persona).subscribe(
                      result => {
                          dialogRef1.close();
                          const dialogRef = this.dialog.open(PopupBienvenidaComponent);
                          this.enviarCorreoBienvenida();
                          dialogRef.afterClosed().subscribe(() => {
                            //console.log('El mensaje emergente se cerró.');
                          });
                        console.log("Persona registrada")
                      },
                      error => {
                        const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
                        //console.log(error)
                      })
                  },
                  error => {
                    const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
                    //console.log(error)
                  })
              },
              error => {
                const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
                //console.log(error)
              })
          },
          error => {
            const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
            //console.log(error)
          })

      },
      error => {
        const dialogRef = this.dialog.open(PopupErrorNewUsuarioComponent);
        //console.log(error)
      })*/

  
  comprobarUsuario(){
    const dialogRef = this.dialog.open(PopupCargandoComponent);
    this._usuarioService.comprobarUsuario(this.persona.correo).subscribe(
      result =>{
        this.resultUser=result;
        console.log(this.resultUser)
        if(this.resultUser.Mensaje="SI" && this.resultUser.id_usuario){
          this.correoUsado=true;
          dialogRef.close()
        }
        else{
          this.correoUsado=false;
          dialogRef.close()
        }
      },
      error=>{
        this.correoUsado=false;
        console.log(error)
        dialogRef.close()
      }  )   
  }
  checkConditions() {
    const checkBox1 = document.getElementById('customCheck1') as HTMLInputElement;
    const checkBox2 = document.getElementById('customCheck2') as HTMLInputElement;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  
    if (checkBox1.checked && checkBox2.checked) {
      this.bra_terminos=true;
    } else {
      this.bra_terminos=false;
    }
  }
  enviarCorreoBienvenida(){
    this._emailService.enviarEmailBienvenida(this.user.usuario).subscribe(
      result => {
        console.log(result)
          },
          error => {
            console.log(error)
          }
        )
   }

  compararCon() {
    if (this.user.password === this.rpassword) {
      this.onSubmit()
    } else {
      this.bandera = true;
    }
  }


  ngOnInit() {
    //console.log("AddUsuario funcionando")
    this._paisService.getPaises().subscribe(
      result => {
        this.paises = result;
        ////console.log(this.paises)
      },
      error => {
        //console.log(error)
      }
    )
  }
}
