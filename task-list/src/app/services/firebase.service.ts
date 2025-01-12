import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp} from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  Firestore
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly firestoreInstance: Firestore;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.firestoreInstance = initializeFirestore(this.app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
  }

  get firestore(): Firestore {
    return this.firestoreInstance;
  }
}
