
import { Injectable } from '@angular/core';
import { environment } from "@environment/environment";

import { Storage } from "@core/helpers/Storage";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public saveToken(token: string): void {
    Storage.set(environment.accessTokenKey, token);
  }

  public getToken(): string | undefined {
    return Storage.get(environment.accessTokenKey);
  }

  /**
   * check token validation
   * @returns boolean the token validity
   * */
  public isAuthorized(): boolean {
    let token: any = Storage.get('user')
    if (!token) {
      return false;
    }
    return true;
  }


  public saveRefreshToken(token: string): void {
    Storage.set(environment.refreshTokenKey, token);
  }

  public getRefreshToken(): string | null {
    return Storage.get(environment.refreshTokenKey);
  }

}
