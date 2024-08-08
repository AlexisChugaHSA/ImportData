// src/app/services/firebase.service.ts
import { Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth = getAuth(); // Obtén la instancia de Auth

  constructor() { }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
