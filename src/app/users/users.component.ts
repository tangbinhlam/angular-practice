import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { UserProfile } from '../core/models/user-profile.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  users$: Observable<UserProfile[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.users$ = this.afs.collection<UserProfile>('users').valueChanges();
  }
}
