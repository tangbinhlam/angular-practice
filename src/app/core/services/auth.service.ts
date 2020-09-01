import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {}

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  async createUserDocument() {
    //Get current user
    const user = await this.afAuth.currentUser;
    //Create the object with new data
    const userProfile: UserProfile = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      address: ' ',
      city: ' ',
      state: ' ',
      zip: ' ',
      phone: ' ',
      specialty: ' ',
      ip: ' ',
    };
    // write to Cloud Firestore
    return this.afs.doc(`users/${user.uid}`).set(userProfile);
  }

  updateUserDocument(userProfile) {
    return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }

  async redirectLogin() {
    const user = await this.afAuth.currentUser;
    const token = await user.getIdTokenResult();
    if (token.claims.admin) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate([`/profile/${user.uid}`]);
    }
  }
}
