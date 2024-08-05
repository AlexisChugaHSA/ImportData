import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth) { }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

 
}