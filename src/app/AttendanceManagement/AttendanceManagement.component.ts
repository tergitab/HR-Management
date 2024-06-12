import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-attendance-management',
    templateUrl: './AttendanceManagement.component.html',
    styleUrls: ['./AttendanceManagement.component.css'],
})
export class AttendanceManagementComponent implements OnInit {

    calendarOptions: any = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        dateClick: this.handleDateClick.bind(this),
        events: [
            // Define your events here
        ]
    };

    dateForm: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder) {
        this.dateForm = this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    handleDateClick(arg: { dateStr: string; }) {
        alert('Date clicked: ' + arg.dateStr);
    }

    onSearch() {
        const fromDate = this.dateForm.get('fromDate')?.value;
        const toDate = this.dateForm.get('toDate')?.value;
        if (fromDate) {
            this.calendarOptions.initialDate = fromDate;
        }
        // Additional logic to filter events within the date range can be added here
    }
}
