// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LogInComponent {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService) { }

    login() {
        this.authService.login(this.email, this.password)
            .catch(error => {
                console.error('Login error:', error);
            });
    }
}
