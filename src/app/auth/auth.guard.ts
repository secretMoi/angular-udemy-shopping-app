import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable, take, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1), // ne prend qu'un seul event si plusieurs sont levés puis unsubscribe
      map(user => {

      const isAuth = !!user;

      if(isAuth) {
        return true;
      } else {
        return this.router.createUrlTree(['/auth']);
      }
    }));
  }

}
