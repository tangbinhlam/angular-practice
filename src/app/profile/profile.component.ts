import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UserProfile } from '../core/models/user-profile.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {}

  ngOnInit() {
    this.userProfile$ = this.afAuth.user.pipe(
      map((user) => this.afs.doc<UserProfile>(`users/${user.uid}`)),
      switchMap((doc) => doc.valueChanges()),
    );
  }
}
