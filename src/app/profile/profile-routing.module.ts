import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  {
    path: ':userName',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
