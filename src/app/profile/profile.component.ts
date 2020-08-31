import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { UserProfile } from '../core/models/user-profile.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  downloadURL$: Observable<string>;
  uploadProgress$: Observable<number>;
  uid: string;
  error: string;
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    public afs: AngularFirestore,
    private afStorge: AngularFireStorage,
  ) {
    this.uid = this.route.snapshot.params['id'];
    this.downloadURL$ = this.afStorge
      .ref(`users/${this.uid}/profile-image`)
      .getDownloadURL();
  }

  ngOnInit() {
    this.userProfile$ = this.route.params.pipe(
      map((param) => param['id']),
      map((uid) => this.afs.doc<UserProfile>(`users/${uid}`)),
      switchMap((doc) => doc.valueChanges()),
      tap((userProfile) => this.profileForm.patchValue(userProfile)),
    );
  }

  onUpdate() {
    this.authService.updateUserDocument(this.profileForm.getRawValue());
  }

  fileChange(event) {
    this.downloadURL$ = null;
    this.error = null;

    const file = event.target.files[0];
    const filePath = `users/${this.uid}/profile-image`;
    const fileRef = this.afStorge.ref(filePath);

    const task = this.afStorge.upload(filePath, file);
    task.catch((error) => (this.error = error.message));

    this.uploadProgress$ = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL$ = fileRef.getDownloadURL();
        }),
      )
      .subscribe();
  }
}
