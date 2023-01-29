import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AuthRoutingModule} from "src/app/auth/auth-routing.module";
import {SharedModule} from "@shared/shared.module";
import {AuthService} from "src/app/auth/auth.service";
import {AuthComponent} from "src/app/auth/auth.component";
import {SignUpComponent} from "src/app/auth/sign-up/sign-up.component";
import {HttpClientModule} from "@angular/common/http";
import { SignInComponent } from './sign-in/sign-in.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule(
  {
      imports: [
          CommonModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          FormsModule,
          MatButtonModule,
          AuthRoutingModule,
          MatInputModule,
          SharedModule,
          HttpClientModule,

      ],
    providers   : [
      AuthService
    ],
    declarations: [
      AuthComponent,
      SignUpComponent,
      SignInComponent,
      VerifyEmailComponent

    ],
    exports     : [
      AuthComponent,
      SignUpComponent,
      SignInComponent,
      VerifyEmailComponent
    ]
  }
)
export class AuthModule
{

}
