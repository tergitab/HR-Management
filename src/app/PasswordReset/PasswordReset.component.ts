// src/app/password-reset/password-reset.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';

@Component({
    selector: 'app-password-reset',
    templateUrl: './PasswordReset.component.html',
    styleUrls: ['./PasswordReset.component.css']
})
export class PasswordResetComponent {
    email: string = '';

    constructor(private authService: AuthService) { }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.email);
    }
}
