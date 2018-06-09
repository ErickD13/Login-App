import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firabase from 'firebase/app'
import { map } from "rxjs/operators";
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(map (auth => auth));
    //return this.afAuth.authState.map(auth => auth);
   ;
  }

  logut(){
    return this.afAuth.auth.signOut();
  }

}
