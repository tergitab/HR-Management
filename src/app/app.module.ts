import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './LogIn/LogIn/LogIn.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { PasswordResetComponent } from './PasswordReset/PasswordReset.component';
import { TimeManagementComponent } from './TimeManagement/TimeManagement.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { AttendanceManagementComponent } from './AttendanceManagement/AttendanceManagement.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LogInComponent,
        PasswordResetComponent,
        TimeManagementComponent,
        AttendanceManagementComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        FullCalendarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
