import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {AppService} from "@core/root/app.service";

import {UserInfo} from "@core/interfaces/User";

import {Theme} from '@core/interfaces/Theme';
import {TokenStorageService} from '@core/services/interceptors/token-storage.service';

import {Language} from "@core/interfaces/Language";
import {environment} from "@environment/environment";
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@core/root/base.component';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '@core/state/favorite';
import * as favoriteActions from '@core/state/favorite/favorite.actions';
import { Store } from '@ngrx/store';
import { favoriteSelector } from '@core/state/favorite/favorite.reducer';
import { Status } from '@core/interfaces/ToDo';


@Component(
  {
    selector   : 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls  : ['dashboard.scss'],
  }
)
export class DashboardComponent extends BaseComponent
{

  get isAuthorized(): boolean
  {
    return this._tokenStorageService.isAuthorized();
  }

 
  showSignup: boolean = true;
  showSignin: boolean = false;
  isChecking: boolean = false;

  

  get userInfo(): any
  {
    return this._authService.userData;
  }

  


  get theme(): Theme
  {
    return this._appService.getTheme() || 'light';
  }

  get lang(): Language
  {
    return this._appService.lang || environment.defaultLang;
  }

  user: any;
  tasks: any[] = [];

  todoForm = new FormGroup({
    task: new FormControl('',  Validators.required),
    assignee: new FormControl(''),
    status: new FormControl('',  Validators.required)
  });
  status: { title: string, value: string }[] = [
    {
      title:'To Be Done',
      value:Status.ToBeDone
    },
    {
      title:'In Progress',
      value:Status.InProgress
    },
    {
      title:'Completed',
      value:Status.Completed
    }
    
  ]
  constructor(private router: Router, private readonly store: Store,private _appService:AppService, private _authService:AuthService,public _tokenStorageService: TokenStorageService,) {
    super()

  }

ngOnInit(){

  }


  checkSignIn(signInSelected :boolean){
    this.showSignin = signInSelected;
    this.showSignup = !this.showSignin;
  }


}
