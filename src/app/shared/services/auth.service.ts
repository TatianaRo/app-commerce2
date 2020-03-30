
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable , of } from 'rxjs';
import { Injectable } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  user$ : Observable<User>;
  isAutenticated : boolean;
  
  constructor(

    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private afs: AngularFirestore,
    private route : ActivatedRoute
  ) {
    
   this.user$ = this.afAuth.authState;
  }

   
  // Sign in with Google
  GoogleAuth() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
 
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      console.log('You are successfully logged in!');
      this.isAutenticated = true;
    }).catch((error) => {
      console.log(error)
    })
  }
 
  AuthLogout(){
    this.afAuth.auth.signOut();
    this.isAutenticated = false;
     }

}
