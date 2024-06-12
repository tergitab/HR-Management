import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/AuthService';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-time-management',
    templateUrl: './TimeManagement.component.html',
    styleUrls: ['./TimeManagement.component.css']
})
export class TimeManagementComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) { }

    ngOnInit(): void {
        // Initialization logic here
    }

    logout() {
        this.authService.logout();
    }

    getUser(): Observable<User> {
        return this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.firestore.collection('users').doc<User>(user.uid).valueChanges();
                } else {
                    return new Observable<User | null>(observer => observer.next(null));
                }
            }),
            map(user => {
                if (user) {
                    return user;
                } else {
                    throw new Error('User not found');
                }
            })
        );
    }

    getUserName(): Observable<string> {
        return this.getUser().pipe(
            map(user => user.name || '')
        );
    }
}
