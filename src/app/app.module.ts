import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "@core/root/app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AppService} from "@core/root/app.service";
import {SharedModule} from "@shared/shared.module";
import { environment } from '../environments/environment';
import {BaseComponent} from "@core/root/base.component";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { favoriteReducer } from '@core/state/favorite/favorite.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FavoriteEffects } from '@core/state/favorite/favorite.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader
{
    return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    MatSnackBarModule ,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide   : TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps      : [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    SharedModule,
    // ngrx related imports
    StoreModule.forRoot({"favorites":favoriteReducer}),
    EffectsModule.forRoot([ FavoriteEffects]),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
 

  ],
  providers: [
    AppService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }