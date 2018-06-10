import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/take';

import { tap, take, map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap (authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      }));
  }
}
