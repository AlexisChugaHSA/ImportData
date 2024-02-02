import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import { GLOBAL } from '../services/global.service';
@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  public membresia1!:any
  public membresia2!:any
  public membresia3!:any
  constructor(
    private _membresiaService:MembresiaService,
    private _route:ActivatedRoute,
    private _router: Router
  ){
    
  }
  get_membresias(){
    this._membresiaService.getMembresia(1).subscribe(
      result=>{
        console.log(result)
        this.membresia1=result
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._membresiaService.getMembresia(2).subscribe(
      result=>{
        console.log(result)
        this.membresia2=result
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._membresiaService.getMembresia(3).subscribe(
      result=>{
        console.log(result)
        this.membresia3=result
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  ngOnInit(){
    console.log("Membresias funcionando")
    this.get_membresias();
  }
}
