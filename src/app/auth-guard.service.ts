import { User } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private auth : AuthService,
              private router : Router) { }


  canActivate(route, state : RouterStateSnapshot){

   if (this.auth.isAutenticated) return true;

      this.router.navigate(['/login'], { queryParams : { returnUrl : state.url }});
      return false;

 /*    return this.auth.user$.map(user =>
      {
        if (user) return true;
    
      this.router.navigate(['/login']);
      return false;
      }); */

    
  }




  }

