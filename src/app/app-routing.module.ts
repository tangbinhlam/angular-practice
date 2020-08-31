import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const redirectUnUthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () =>
  map((user) => (user ? ['profile', (user as any).uid] : true));
const onlyAllowSelf = (next) =>
  map((user) => !!user && next.params.id == (user as any).uid) || [''];

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelf },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
