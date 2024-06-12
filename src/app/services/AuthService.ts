// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
    uid: string;
    email: string;
    role: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
                        map(userDoc => userDoc || null)
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    login(email: string, password: string): Promise<void> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    return this.firestore.collection('users').doc(user.uid).ref.get()
                        .then(doc => {
                            if (!doc.exists) {
                                this.firestore.collection('users').doc(user.uid).set({
                                    email: user.email,
                                    role: 'employee' // Default role, change as necessary
                                });
                            }
                            this.router.navigate(['dashboard']);
                            return Promise.resolve(); // Ensure a value is returned
                        });
                } else {
                    window.alert('User not found.');
                    return Promise.reject('User not found.'); // Ensure a value is returned
                }
            }).catch(error => {
                window.alert(error.message);
                return Promise.reject(error); // Ensure a value is returned
            });
    }

    logout() {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['login']);
        });
    }

    getUserRole(): Observable<string> {
        return this.user$.pipe(
            map(user => user?.role || '')
        );
    }


    sendPasswordResetEmail(email: string) {
        return this.afAuth.sendPasswordResetEmail(email).then(() => {
            window.alert('Password reset email sent, check your inbox.');
        }).catch(error => {
            window.alert(error.message);
        });
    }

}
