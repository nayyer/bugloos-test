import {Component} from "@angular/core";
import {AuthService} from "src/app/auth/auth.service";
import { BaseComponent } from '@core/root/base.component';


@Component(
  {
    selector: 'app-verify-email',
    templateUrl: 'verify-email.html',
    styleUrls: ['verify-email.scss']
  }
)
export class VerifyEmailComponent extends BaseComponent {
 

  constructor(public _authService: AuthService) {
    super();
  }

}
