import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private afAuth: AngularFireAuth,
    private router: Router,
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
      }
      this.registerForm.reset();
      this.router.navigate([`/profile/${resp.user.uid}`]);
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
