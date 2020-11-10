import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Ability } from '@casl/ability';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private ability: Ability, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = route.data.permissions;
    const condition = route.data.condition ?? 'or';
    let isAuthorized = false;

    if (permissions == null)
      return true;

    const canArray: boolean[] = [];
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i].split('.');
      const action = permission[1];
      const module = permission[0];

      canArray.push(this.ability.can(action, module));
    }
    
    // and - if contains false (not authorized)
    // or - if contains true (authorized)
    if (condition === 'and')
      isAuthorized = !canArray.includes(false);
    else 
      isAuthorized = canArray.includes(true);

    if (isAuthorized)
      return true;
    else 
      return this.router.parseUrl('/403');
  }
}