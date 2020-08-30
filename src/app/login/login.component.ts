import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    const { firstName, lastName, email, password } = this.registerForm.value;
    try {
      const resp = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await resp.user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      this.registerForm.reset();
    } catch (error) {
      console.log(error);
    }
  }
}
