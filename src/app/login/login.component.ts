import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  action: 'login' | 'signup' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    const { firstName, lastName, email, password } = this.registerForm.value;
    try {
      let resp;
      if (this.isLogin) {
        resp = await this.afAuth.signInWithEmailAndPassword(email, password);
      } else {
        resp = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await resp.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        await this.auth.createUserDocument();
      }
      this.registerForm.reset();
      this.auth.redirectLogin();
    } catch (error) {
      console.log(error);
    }
  }

  get isLogin() {
    return this.action === 'login';
  }

  get isSignup() {
    return this.action === 'signup';
  }
}
