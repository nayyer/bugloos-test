import {Component} from '@angular/core';
import {Theme} from "@core/interfaces/Theme";
import {AppService} from "@core/root/app.service";
import {environment} from "@environment/environment";

import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import { Menu } from '@core/interfaces/Menu';

@Component({
             selector   : 'app-footer',
             templateUrl: './footer.html',
             styleUrls  : ['./footer.scss'],

           })
export class FooterComponent
{

  menuItems: Menu[]                                                     = [
    {
      label: 'Category',
      items: [
        {
          label: 'ABOUT',
          route: '/about'
        },
        {
          label: 'CONTACT',
          route: '/contact'
        },
        {
          label: 'FOOTER.BITMAX_RULES',
          route: '/terms'
        },
        {
          label: 'FOOTER.API',
          route: 'environment.docsUrl',
          isAbsolute: true,
        },
        {
          label: 'HIRING',
          route: '/hiring'
        },
        {
          label: 'FOOTER.NOTIFICATIONS',
          route: '/notices'
        },
        {
          label: 'FOOTER.BITMAX_SECURITY',
          route: '/certificate'
        },
      ]
    },
    {
      label: 'Quick Links',
      items: [
        {
          label: 'FOOTER.MARKET_STATUS',
          route: '/market'
        },

        {
          label: 'FOOTER.FEE_RULES',
          route: '/rules'
        },

        {
          label: 'FOOTER.ANALYSIS',
          route: '/analysis'
        },

        {
          label: 'FOOTER.REFERRAL',
          route: '/referral'
        },

        {
          label: 'FOOTER.SWAP',
          route: '/quick-order'
        },
        {
          label: 'FOOTER.EXCHANGE',
          route: '/exchange'
        },
        {
          label: 'FOOTER.BITMAX_CARD',
          route: '/buy-crypto'
        },
        //{
        //  label: 'CERTIFICATES',
        //  route: '/certificate'
        //},
        //{
        //  label: 'FOOTER.SWAP_GUID',
        //  route: '/help/authentication'
        //},
        //{
        //  label: 'FOOTER.EXCHANGE_GUID',
        //  route: '/help/authentication'
        //},
        // {
        //   label: 'USAGE_GUID',
        //   route: '/help'
        // },
      ]
    },
  ]
  socialItems: { iconClass: string, iconUrl?: string, link: string }[] = [
    {
      link     : environment.instagram,
      iconClass: 'instagram-mid'
    },
    {
      link     : environment.twitter,
      iconClass: 'twitter-mid'
    },
    {
      link     : environment.telegram,
      iconClass: 'telegram-mid'
    },
    {
      link     : environment.linkedin,
      iconClass: 'linkedin-mid'
    },

  ]


  get theme(): Theme
  {
    return this._appService.getTheme() || 'light';
  }
  get isAuthorized(): boolean
  {
    return this._tokenStorageService.isAuthorized();
  }

  constructor(private _appService: AppService, public _tokenStorageService: TokenStorageService,)
  {
    this.makeIcons()
  }
  

  makeIcons()
  {
    this._appService.addSVGIcon('instagram-mid');
    this._appService.addSVGIcon('twitter-mid');
    this._appService.addSVGIcon('telegram-mid');
    this._appService.addSVGIcon('sun-mid');
    this._appService.addSVGIcon('linkedin-mid');

  }
}
