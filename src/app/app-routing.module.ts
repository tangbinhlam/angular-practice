import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  customClaims,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { pipe } from 'rxjs';

const redirectUnUthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () =>
  map((user) => (user ? ['profile', (user as any).uid] : true));
const onlyAllowSelf = (next) =>
  map((user) => !!user && next.params.id == (user as any).uid) || [''];

const onlyAdmin = (next) =>
  pipe(
    customClaims,
    map((claims) => claims.admin === true || ['']),
  );

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
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAdmin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
