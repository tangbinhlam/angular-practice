import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProfile } from '../models/user-profile.model';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
