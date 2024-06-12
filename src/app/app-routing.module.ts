import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './LogIn/LogIn/LogIn.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { PasswordResetComponent } from './PasswordReset/PasswordReset.component';
import { AuthGuard } from './services/AuthGuard';
import { TimeManagementComponent } from './TimeManagement/TimeManagement.component';
import { AttendanceManagementComponent } from './AttendanceManagement/AttendanceManagement.component';

const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'time-management', component: TimeManagementComponent },
    { path: 'attendance-management', component: AttendanceManagementComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
