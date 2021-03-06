import {AccessTokenInterceptor} from '@app/core/services/access-token-interceptor';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app-component/app.component';
import {MatButtonModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@app/shared/modules/shared.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import 'hammerjs';
import {AuthService} from './services';
import {ToastrModule} from 'ngx-toastr';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';

registerLocaleData(localePl, 'pl-PL', localePlExtra);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
   { provide: HTTP_INTERCEPTORS,
    useClass: AccessTokenInterceptor,
    multi: true,
   }
  ],
  bootstrap: [AppComponent],
schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
