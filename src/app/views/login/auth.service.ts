import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from './user.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  showMenu = new EventEmitter<boolean>();

  provider = new GoogleAuthProvider();
  auth = getAuth();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return from(null);
        }
      })
    );
  }
  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    this.showMenu.emit(true);

    //console.log(credential.user);
    this.router.navigate(['/home']);
    return this.updateUserData(credential.user);
  }

  async googleSignOut() {
    await this.afAuth.signOut();

    this.showMenu.emit(false);
    this.router.navigate(['/login']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
