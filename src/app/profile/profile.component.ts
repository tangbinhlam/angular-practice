import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserProfile } from '../core/models/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  profileForm: FormGroup = this.fb.group({
    uid: [''],
    name: [''],
    email: [''],
    address: [''],
    city: [''],
    state: [''],
    zip: [''],
    phone: [''],
    specialty: [''],
    ip: [''],
  });

  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.userProfile$ = this.route.params.pipe(
      map((param) => param['id']),
      map((uid) => this.afs.doc<UserProfile>(`users/${uid}`)),
      switchMap((doc) => doc.valueChanges()),
      tap((userProfile) => this.profileForm.patchValue(userProfile)),
    );
  }

  onUpdate() {}
}
