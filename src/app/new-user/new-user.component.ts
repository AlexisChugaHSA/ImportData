import { Component, Renderer2 } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
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

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  public user!:Usuario;
  public rpassword:string="";
  public bandera:boolean=false;
  public persona!:Persona;
  public pais!:Pais;
  public ciudad!:Ciudad;
  public paises!:any;
  public ciudades!:any;
  public usuario!:any;
  public paisSeleccionadoP!: Pais;
  public ciudadSeleccionadaP!: Ciudad;
  public paisSeleccionadoE!: Pais;
  public ciudadSeleccionadaE!: Ciudad;
  public direccionP!:Direccion;
  public direccionP2!:any;
  public direccionE!:Direccion;
  public direccionE2!:any;
  public empresa!:Empresa;
  public empresa2!:any;

  
  constructor(
    private _usuarioService:UsuarioService,
    private _paisService:PaisService,
    private _ciudadService:CiudadService,
    private _empresaService:EmpresaService,
    private _direccionService:DireccionService,
    private _personaService:PersonaService,
    private _route:ActivatedRoute,
    private _router: Router,
    private renderer: Renderer2
  ){
    this.user=new Usuario(0,"","","");
    this.persona=new Persona(0,0,0,0,"","","","");
    this.direccionP=new Direccion(0,0,0);
    this.direccionE=new Direccion(0,0,0);
    this.empresa=new Empresa(0,1,"",0,"","","")
  }

  nextForm1() {
    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form2');
    const btn1= document.querySelector('#btn1');
    const btn2= document.querySelector('#btn2');
    this.renderer.setStyle(form1, 'display', 'none');
    this.renderer.setStyle(form2, 'display', 'block'); 
    this.renderer.setStyle(btn1, 'display', 'none'); 
    this.renderer.setStyle(btn2, 'display', 'block'); 
    this.user.usuario=this.persona.correo
  }
  
  nextForm2() {
    const form2 = document.querySelector('#form2');
    const form3 = document.querySelector('#form3');
    const btn2= document.querySelector('#btn2');
    const btn3= document.querySelector('#btn3');
    this.renderer.setStyle(form2, 'display', 'none');
    this.renderer.setStyle(form3, 'display', 'block'); 
    this.renderer.setStyle(btn2, 'display', 'none'); 
    this.renderer.setStyle(btn3, 'display', 'block'); 
  }

  prevForm2() {
    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form2');
    const btn1= document.querySelector('#btn1');
    const btn2= document.querySelector('#btn2');
    this.renderer.setStyle(form1, 'display', 'block');
    this.renderer.setStyle(form2, 'display', 'none'); 
    this.renderer.setStyle(btn1, 'display', 'block'); 
    this.renderer.setStyle(btn2, 'display', 'none'); 
  }
  prevForm3() {
    const form2 = document.querySelector('#form2');
    const form3 = document.querySelector('#form3');
    const btn2= document.querySelector('#btn2');
    const btn3= document.querySelector('#btn3');
    this.renderer.setStyle(form2, 'display', 'block');
    this.renderer.setStyle(form3, 'display', 'none'); 
    this.renderer.setStyle(btn2, 'display', 'block'); 
    this.renderer.setStyle(btn3, 'display', 'none'); 
  }
  ocultarMensajeCon(){
    this.bandera=false;
  }


  onCountryPSelectionChange(country: Pais) {
    this.paisSeleccionadoP = country;
    this._ciudadService.getCiudadesP(this.paisSeleccionadoP.id_pais).subscribe(
      result =>{
        this.ciudades=result;
      },
      error=>{
        console.log(error);
      }  ) 
    console.log(country);
      this.direccionP.id_pais=this.paisSeleccionadoP.id_pais
  }
  onCityPSelectionChange(city: Ciudad) {
    this.ciudadSeleccionadaP = city;
    console.log(this.ciudadSeleccionadaP);
    this.direccionP.id_ciudad=this.ciudadSeleccionadaP.id_ciudad
  }
  onCountryESelectionChange(country: Pais) {
    this.paisSeleccionadoE = country;
    this._ciudadService.getCiudadesP(this.paisSeleccionadoE.id_pais).subscribe(
      result =>{
        this.ciudades=result;
      },
      error=>{
        console.log(error);
      }  ) 
    console.log(country);
      this.direccionE.id_pais=this.paisSeleccionadoE.id_pais
  }
  onCityESelectionChange(city: Ciudad) {
    this.ciudadSeleccionadaE = city;
    console.log(this.ciudadSeleccionadaE);
    this.direccionE.id_ciudad=this.ciudadSeleccionadaE.id_ciudad
  }
  onSubmit(){
    //agregar direccion persona
    this._direccionService.addDireccion(this.direccionP).subscribe(
      result =>{
        this.direccionP2=result
        this.persona.id_direccion=this.direccionP2.id_direccion
        console.log("Direccion de persona registrada")
      },
      error=>{
        console.log(error)
      }) 
      //agregar direccion empresa
    this._direccionService.addDireccion(this.direccionE).subscribe(
      result =>{
        this.direccionE2=result
        this.empresa.direccion=this.direccionE2.id_direccion
        console.log("Direccion de empresa registrada")
      },
      error=>{
        console.log(error)
      })  
    //agregar usuario
    this._usuarioService.addUsuario(this.user).subscribe(
      result =>{
        this.usuario=result
        this.persona.id_usuario=this.usuario.id_usuario
        console.log("Usuario registrado")
      },
      error=>{
        console.log(error)
      }) 
      //agregar empresa
      this._empresaService.addEmpresa(this.empresa).subscribe(
        result =>{
          this.empresa2=result
          this.persona.id_empresa=this.empresa2.id_empresa
          console.log("Empresa registrada")
        },
        error=>{
          console.log(error)
        }) 

      //agregar persona
      this._personaService.addPersona(this.persona).subscribe(
        result =>{
          this._router.navigate(['/login']);
          console.log("Persona registrada")
        },
        error=>{
          console.log(error)
        }) 

  }

  compararCon(){
    if (this.user.password === this.rpassword) {
      this.onSubmit()
    } else {
      this.bandera=true;
    }
  }


  ngOnInit(){
    console.log("AddUsuario funcionando")
    this._paisService.getPaises().subscribe(
      result =>{
        this.paises=result;
        console.log(this.paises)
      },
      error=>{
        console.log(error)
      }
    )
  }
}
