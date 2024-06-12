// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/AuthService'; // Assuming User interface is exported from AuthService
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    userRole: string = '';
    user: User | undefined;
    file: string = '';

    constructor(
        private authService: AuthService,
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) { }

    ngOnInit() {
        this.authService.getUserRole().subscribe(role => {
            this.userRole = role;
        });

        this.getUser().subscribe(user => {
            this.user = user;
        });
    }

    logout() {
        this.authService.logout();
    }

    preventNavigation(event: Event): void {
        event.preventDefault();
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

    removeProfilePicture(): void {
        this.file = ''; // Clear the file
        localStorage.removeItem('photoUrl'); // Remove the photoUrl from localStorage
    }

    onFileChange(event: any): void {
        const files = event.target.files as FileList;

        if (files.length > 0) {
            const selectedFile = files[0];
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const imageUrl = e.target.result;
                this.file = imageUrl;
                localStorage.setItem('photoUrl', imageUrl);
            };
        }
    }
}
