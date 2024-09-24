import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { map } from 'rxjs/operators'; // Importa correctamente el operador map
import { Observable } from 'rxjs';     // Asegúrate de que Observable esté disponible

export const routerInjection = () => inject(Router);
export const authStateObs$ = (): Observable<any> => inject(AuthService).authState$;  // Asegúrate de tipar correctamente

export const authGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (!user) {
        router.navigate(['login']);
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (user) {
        router.navigate(['']);
        return false;
      }
      return true;
    })
  );
};
