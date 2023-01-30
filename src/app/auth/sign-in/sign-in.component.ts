import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs";
import { StringHelper } from "@core/helpers/StringHelper";
import { AppService } from "@core/root/app.service";
import { BaseComponent } from '@core/root/base.component';
import { FloatLabelType } from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component(
  {
    selector: 'app-sign-in',
    templateUrl: 'sign-in.html',
    styleUrls: ['sign-in.scss']
  }
)
export class SignInComponent extends BaseComponent implements OnInit

{
  emailRegex: string = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  floatLabelType: FloatLabelType = 'always' as FloatLabelType;
  isPasswordVisible: boolean = false;
  mode: 'login' | 'otp' = 'login';
  recaptchaSubscription: Subscription = new Subscription();
  isChecking: boolean = false;
  isCheckingLogin: boolean = false;
  recaptchaToken: string | undefined = '';
  isResending: boolean = false;
  canResend: boolean = false;
  form: { email: string, password: string } = {
    email: '',
    password: '',
  }

  get isMobileView(): boolean {
    return this._appService.isMobileView;
  }
  constructor(
    private _authService: AuthService,
    private _appService: AppService,
    private _translate: TranslateService,
    private _snackbar: MatSnackBar

  ) {
    super();
  }


  ngOnInit() {}


  /**
   * submit the login form
   * */
  submit() {
    if (this.form.email && this.form.password) {
      if (!StringHelper.isEmail(this.form.email)) return;
      this.isCheckingLogin = true;
      this._authService.SignIn(this.form.email, this.form.password).then(() => {
        
      }).catch(err=>{
        this._snackbar.open('Your Data is invalid.', 'close');
      })
    }

  }

  checkFormIsValid() {
    if (this.form.password && this.form.email && StringHelper.isEmail(this.form.email) ) {
      return true;
    }
    return false;

  }

  signInWithSSO() {
    this._authService.GoogleAuth()
  }

}
