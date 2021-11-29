import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
 /*  provider = new GoogleAuthProvider();
  constructor(private afAuth: AngularFireAuth) {}

  auth = getAuth();

  async googleLogin() {
    await signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
      }); 
  }

  logout() {
    this.afAuth.signOut();
  } */
  
}
