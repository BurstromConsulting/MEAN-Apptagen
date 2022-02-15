import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  private roles: string[] = [];


  constructor(private router: Router, public tokenService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isAdmin();
  }

  public isAdmin(): boolean {
    const user = this.tokenService.getUser();
    if(!user.roles.includes('ROLE_ADMIN')){
      this.router.navigate(['profile']);
    }
    return user.roles.includes('ROLE_ADMIN');
  }
}
