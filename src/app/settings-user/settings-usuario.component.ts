import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioLog } from '../models/usuarioLog';
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
import { Usuario } from '../models/usuario';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './settings-usuario.component.html',
  styleUrls: ['./settings-usuario.component.css']
})
export class PerfilUsuarioComponent {
  public sidenavVisible = false;
  public rpassword: string = "";
  public newPassword: string = "";
  public bandera: boolean = false;
  public persona!: Persona;
  public pais!: Pais;
  public ciudad!: Ciudad;
  public paises!: Pais[];
  public ciudadesP!: any;
  public ciudadesE!: any;
  public usuario!: Usuario;
  public paisSeleccionadoP!: Pais;
  public ciudadSeleccionadaP!: Ciudad;
  public paisSeleccionadoE!: Pais;
  public ciudadSeleccionadaE!: Ciudad;
  public direccionP!: Direccion;
  public direccionE!: Direccion;
  public empresa!: Empresa;
  public mensaje!: any;
  public mensajeAlert:string = "";
  public login:boolean=false;
  public dialogRef!:any;
  public empresa2=new Empresa(0,40,"",0,"","","");

  constructor(
    private authService: AuthService,
    private _usuarioService: UsuarioService,
    private _paisService: PaisService,
    private _ciudadService: CiudadService,
    private _empresaService: EmpresaService,
    private _direccionService: DireccionService,
    private _personaService: PersonaService,
    private localStorageService: LocalStorageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {
      this.dialogRef = this.dialog.open(PopupCargandoComponent);
      this.authService.getIsLoggedIn().subscribe(
        result => {
          let mensaje=result
          this.login=mensaje.login;

          //console.log(mensaje.login)
        },
        error => {
          this._router.navigate(['/login'])
          //console.log(error)
          this.login=false;
          
        })
    this.usuario = new Usuario(0, "", "",""),
    this.persona = new Persona(0, 0, 0, 0, "", "", "", "");
    this.direccionP = new Direccion(0, 0, 0);
    this.direccionE = new Direccion(0, 0, 0);
    this.empresa = new Empresa(0,1,"", 0, "", "", "");
  }
  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    //Cargar paises
    this._paisService.getPaises().subscribe(
      result => {
        this.paises = <Pais[]>result;
      },
      error => {
        console.log(error)
      }
    )


    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        if(this.persona.id_empresa==0){
          this.dialogRef.close();
        }
        else{
        this._empresaService.getEmpresa(this.persona.id_empresa).subscribe(
          result => {
            this.empresa = <Empresa>result;
            this._direccionService.getDireccion(this.empresa.direccion).subscribe(
              result => {
                this.direccionE = <Direccion>result;
                this._paisService.getPais(this.direccionE.id_pais).subscribe(
                  result => {
                    this.paisSeleccionadoE = <Pais>result;
                  }
                )
                this._ciudadService.getCiudad(this.direccionE.id_ciudad).subscribe(
                  result => {
                    this.ciudadSeleccionadaE = <Ciudad>result;
                  }
                )
                this._ciudadService.getCiudadesP(this.direccionE.id_pais).subscribe(
                  result => {
                    this.ciudadesE = result;
                  })
              })
          },
          error => {
            console.log(error)
          }
        )}
        //Consultar direccion de persona
        if(this.persona.id_direccion==0){this.dialogRef.close();}
        else{
        this._direccionService.getDireccion(this.persona.id_direccion).subscribe(
          result => {
            this.direccionP = <Direccion>result;
            this._paisService.getPais(this.direccionP.id_pais).subscribe(
              result => {
                this.paisSeleccionadoP = <Pais>result;
              }
            )
            this._ciudadService.getCiudad(this.direccionP.id_ciudad).subscribe(
              result => {
                this.ciudadSeleccionadaP = <Ciudad>result;
              }
            )
            this._ciudadService.getCiudadesP(this.direccionP.id_pais).subscribe(
              result => {
                this.ciudadesP = result;
                this.dialogRef.close();
              })
          })}
      },
      error => {
        console.log(error)
      })
  }
  toggleSidenav(event: Event) {
    event.stopPropagation();
    this.sidenavVisible = !this.sidenavVisible;
    const sidenav:any = document.getElementById('sidenav-main');
    sidenav.style.transform = this.sidenavVisible ? 'translateX(0)' : 'translateX(-100%)';
  }

/*

  compararCon(){
    if (this.usuario.password === this.rpassword) {
      this.guardarPassword()
    } else {
      this.bandera=true;
    }
  }

*/
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onCountryPSelectionChange(country: Pais) {
    this.paisSeleccionadoP = country;
    this._ciudadService.getCiudadesP(this.direccionP.id_pais).subscribe(
      result => {
        this.ciudadesP = result;
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
        this.ciudadesE = result;
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
  mostrarAlertCS() {
    const alerta = document.querySelector('#alertCS');
    this.renderer.setStyle(alerta, 'display', 'block');
  }

  ocultarAlertCS() {
    const alerta = document.querySelector('#alertCS');
    this.renderer.setStyle(alerta, 'display', 'none');
  }
  ocultarMensajeCon() {
    this.bandera = false;
  }
  /*

  cambiarPassword() {
    if (this.user.password === this.rpassword) {

    } else {
      this.bandera = true;
    }
  }*/
  guardarPersona() {
    this._personaService.editPersona(this.persona.id_persona, this.persona).subscribe(
      result => {
        //console.log(result);
      },/*
    //agregar direccion persona
        this._direccionService.addDireccion(this.direccionP).subscribe(
      result => {
        this.direccionP = <Direccion>result
        this.persona.id_direccion = this.direccionP.id_direccion
        //console.log("Direccion de persona actualizada")
        this._personaService.editPersona(this.persona.id_persona, this.persona).subscribe(
          result => {
            //console.log(result);
          })
          
        
      },*/
      error => {
        //console.log(error)
      })
      setTimeout(() => {
        const alertP= document.querySelector('#alertP');
        this.renderer.setStyle(alertP, 'display', 'block');
        setTimeout(() => {
          this.renderer.setStyle(alertP, 'display', 'none');
        }, 3000);
      }, 0); 
    }

    guardarNuevaEmpresa(){
      const dialogRef = this.dialog.open(PopupCargandoComponent)
      const alertE2= document.querySelector('#alertEE');
      console.log(alertE2)
      this._empresaService.addEmpresa(this.empresa2).subscribe(
        result => {
          let empresa3:any = result
          this.persona.id_empresa = empresa3.id_empresa
          console.log("Empresa registrada")
          this._personaService.editPersona(this.persona.id_persona, this.persona).subscribe(
            result => {
              console.log("Persona registrada");
              dialogRef.close();
              this._router.navigate(['/home']).then(() =>
                this._router.navigate(['/perfil-usuario'])
            );
            },
            error => {
              dialogRef.close();
              console.log(error)
            })

    },        error => {
      dialogRef.close();
      console.log(error)
    })
    dialogRef.close();
    setTimeout(() => {
      this.renderer.setStyle(alertE2, 'display', 'block');
      setTimeout(() => {
        this.renderer.setStyle(alertE2, 'display', 'none');
      }, 5000);
    }, 0);

  }

  

    guardarEmpresa(){
      const dialogRef = this.dialog.open(PopupCargandoComponent)
      this._empresaService.editEmpresa(this.empresa.id_empresa, this.empresa).subscribe(
        result => {
          //console.log(result);
        }
      )/*
      //agregar direccion persona
      this._direccionService.addDireccion(this.direccionE).subscribe(
        result => {
          this.direccionE = <Direccion>result
          this.empresa.direccion = this.direccionE.id_direccion
          //console.log("Direccion de empresa actualizada")
          //console.log(this.empresa)
          this._empresaService.editEmpresa(this.empresa.id_empresa, this.empresa).subscribe(
            result => {
              //console.log(result);
            }
          )
        },
        error => {
          //console.log(error)
        })*/
        dialogRef.close()
        setTimeout(() => {
          const alertE= document.querySelector('#alertE');
          this.renderer.setStyle(alertE, 'display', 'block');
          setTimeout(() => {
            this.renderer.setStyle(alertE, 'display', 'none');
          }, 3000);
        }, 0);
    }
    
    guardarPassword(){
      const dialogRef = this.dialog.open(PopupCargandoComponent)
      const alertC= document.querySelector('#alertC');
        if (this.newPassword === this.rpassword) {
          this._usuarioService.comprobarPassword(this.usuario).subscribe(
            result=>{
              this.mensaje=result;
              //console.log(result)
              if (this.mensaje.mensaje==='OK'){
                this.usuario.password=this.newPassword;
                this._usuarioService.editUsuario(this.usuario.id_usuario,this.usuario).subscribe(
                  result=>{
                    //console.log(result)
                    dialogRef.close()
                    setTimeout(() => {
                      this.renderer.setStyle(alertC, 'display', 'block');
                      setTimeout(() => {
                        this.renderer.setStyle(alertC, 'display', 'none');
                      }, 3000);
                    }, 0);
                  })
              }
              else{
                this.mensajeAlert="La contraseña actual no es la correcta"
                this.bandera=true;
                dialogRef.close()
              }
              
            })
          
        }else {
          this.mensajeAlert="Las contraseñas no coinciden"
          this.bandera=true;
          dialogRef.close()
        }
    }
    logout(){
      this.authService.logout(this.usuario.id_usuario).subscribe(
        result=>{
            //console.log(result);
            this.clearLocalStorage();
            this._router.navigate(['/login']);
          },
          error=> {
            //console.log(error)
          }
        )
    }
    clearLocalStorage(): void {
      localStorage.clear();
      //console.log('Local Storage borrado');
    }
  }