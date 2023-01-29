import { Component } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { AppService } from "@core/root/app.service";
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@core/root/base.component';
import { StringHelper } from "@core/helpers/StringHelper";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component(
  {
    selector: 'app-sign-up',
    templateUrl: 'sign-up.html',
    styleUrls: ['sign-up.scss']
  }
)
export class SignUpComponent extends BaseComponent {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^[a-z0-9]{6,30}$";
  activeStepIndex: number = 1;
  referral_code: string = '';
  nationalCodeRegex: RegExp = StringHelper.nationalCodeRegex();
  mobileRegex: RegExp = StringHelper.mobileRegex();
  referralCodeRegex: RegExp = StringHelper.exact6CharsRegex();
  userProfile: FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  })

  agreement: boolean = false;
  isChecking: boolean = false;

  get isMobileView(): boolean {
    return this._appService.isMobileView;
  }

  get form1() {
    return this.userProfile.controls
  }

  constructor(private _router: Router,
    private _snackbar: MatSnackBar,
    private _appService: AppService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
    this._appService.addSVGIcon('eye-disable-mid');
    this._appService.addSVGIcon('eye-mid');
  }

  ngOnInit() {
    this._activatedRoute.queryParams.pipe(takeUntil(this.stop$)).subscribe((queryParams: any) => {
      if (queryParams.referral) {
        this.referral_code = queryParams.referral;
      }
    })
  }


  onSubmit() {
    this._authService.SignUp(this.userProfile.value).then(() => {
      this._router.navigate(['/']);
    }
    ).catch(err => {
      this.isChecking = false;
      this._snackbar.open('sign up do not success.', 'close');
    })
  }

  signInWithSSO() {
    this._authService.GoogleAuth()
  }

}
