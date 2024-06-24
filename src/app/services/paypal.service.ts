import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class PayPalService  {
    public url!:string;
    private access_token!:string;
    private clientId='AYLqvj3pfMRED1JHhtL2p1TvTMT_m_jvqTF_VvwtZ-nE8aCfzVdRDLxNs_eR9scSx9ZzKtnlButvv3nw';
    private clientSecret='EFHeU2Aj6D3tAteJ-yXpEbM6sIVyOdZnCY9HL2jkFXig4xHFWqTUMtoPWLC9vao2VZwRw0l3OIjprmdp';
    private apiPaypal='https://api-m.sandbox.paypal.com';
    private tokenUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
    
    constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
        this.url=GLOBAL.url;
        this.access_token=this.localStorageService.get('token');
        this.url=GLOBAL.url;
        this.access_token=this.localStorageService.get('token');
      }
      getToken(): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        });
        const body = new HttpParams().set('grant_type', 'client_credentials');
        return this._http.post(this.tokenUrl, body.toString(), { headers });
      }
    }
    
