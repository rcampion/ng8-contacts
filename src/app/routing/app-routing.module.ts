import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { EmailComponent } from '../email/email.component';
import { LoginRouteGuard } from '../login/login.guard';
import { AuthorizationRouteGuard } from '../login/authorization.guard';
import { RegistrationComponent } from '../registration/registration.component';
import { UserContactsListComponent } from '../user-contacts/user-contacts-list/user-contacts-list.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { PasswordComponent } from '../password/password.component';

const routes: Routes = [

    { path: 'register', component: RegistrationComponent },
    { path: 'authenticate', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'email/:id', component: EmailComponent },
    { path: 'password', component: PasswordComponent, canActivate: [LoginRouteGuard] },
    { path: 'user-contacts', component: UserContactsListComponent, canActivate: [LoginRouteGuard] },
    { path: 'users', loadChildren: './../users/users.module#UsersModule', canActivate: [AuthorizationRouteGuard] },
    { path: 'contact', loadChildren: './../contact/contact.module#ContactModule', canActivate: [LoginRouteGuard] },
    { path: 'group', loadChildren: './../group/group.module#GroupModule', canActivate: [LoginRouteGuard] },
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: './../home/home.module#HomeModule'
    },
    {
        path: 'settings',
        loadChildren: './../settings/settings.module#SettingsModule'
    },
    {
        path: 'profile',
        loadChildren: './../profile/profile.module#ProfileModule'
    }


];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

