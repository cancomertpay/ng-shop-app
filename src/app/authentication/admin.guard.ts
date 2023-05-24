import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(
        private authSerice: AuthService,
        private router: Router
        ) {
        
    }
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean |Observable<boolean| UrlTree> | Promise<boolean | UrlTree> {

            return this.authSerice.user.pipe(
                map(user => {
                    return !!user && user.email == environment.adminEmail
                }),
                tap(isAdmin => {
                    if(!isAdmin) {
                        this.router.navigate(['/auth']);
                    }
                })
            )
    }

}