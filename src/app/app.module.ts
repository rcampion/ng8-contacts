
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestInterceptor } from './core/services/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
// import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LoginRouteGuard } from './login/login.guard';
import { AuthorizationRouteGuard } from './login/authorization.guard';
import { AppRoutingModule } from './routing/app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UsersService } from './core/services/users.service';
import { RegistrationService } from './core/services/registration.service';
import { AccountEventsService } from './core/services/account.events.service';
import { ErrorService } from './core/services/error.service';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './navigation/footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmailComponent } from './email/email.component';
import { UserContactsListComponent } from './user-contacts/user-contacts-list/user-contacts-list.component';
import { UserContactsSelectionListComponent } from './user-contacts/user-contacts-selection-list/user-contacts-selection-list.component';
// tslint:disable-next-line:max-line-length
import { UserContactsSelectionDialogComponent } from './user-contacts/user-contacts-selection-dialog/user-contacts-selection-dialog.component';
import { ContactDeleteDialogComponent } from './contact/contact-delete/contact-delete-dialog.component';
import { PasswordComponent } from './password/password.component';
import { CoreModule } from './core/core.module';

import { CommonService } from './core/services/common.service';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        AboutComponent,
        HeaderComponent,
        SidenavListComponent,
        LoginComponent,
        ErrorComponent,
        FooterComponent,
        RegistrationComponent,
        EmailComponent,
        UserContactsListComponent,
        UserContactsSelectionListComponent,
        UserContactsSelectionDialogComponent,
        ContactDeleteDialogComponent,
        PasswordComponent
    ],
    entryComponents: [
        UserContactsSelectionListComponent,
        UserContactsSelectionDialogComponent,
        ContactDeleteDialogComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        MaterialModule,
        FlexLayoutModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true,
    },
        CommonService, UsersService, RegistrationService, LoginRouteGuard, AuthorizationRouteGuard, AccountEventsService, ErrorService,
    ],
    bootstrap: [AppComponent, ErrorComponent]
})
export class AppModule { }
