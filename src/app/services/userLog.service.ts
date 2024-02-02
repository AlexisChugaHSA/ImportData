import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global.service';


@Injectable({
    providedIn: 'root'
})
export class UserLogService {
    public url!: string;
    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url
    }
    public user_login!: any;

    setUser(usuario: Usuario) {
        this._http.get(this.url + 'usuario/' + usuario.usuario).subscribe(
            result => {
                this.user_login = result
            })

        console.log(this.user_login)
    }
    getUser() {
        return this.user_login;
    }
    usuarioLogueado(): boolean {
        if (this.user_login.token != null) {
            return true;
        }
        else {
            return false;
        }
    }
}
