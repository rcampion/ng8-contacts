import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ContactsService } from '../../../core/services/contacts.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { EMail } from '../../../core/interface/email.model';

export interface EMailType {
    value: number;
    viewValue: string;
}
@Component({
    selector: 'app-contact-email-create-dialog',
    templateUrl: './contact-email-create-dialog.component.html',
    styleUrls: ['./contact-email-create-dialog.component.css']
})
export class ContactEmailCreateDialogComponent implements OnInit {
    contactId: string;
    public email: EMail;
    public emailForm: FormGroup;

    emailTypes: EMailType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }

    ];

    constructor(
        private location: Location,

        private repository: ContactsService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialogRef: MatDialogRef<ContactEmailCreateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit() {

        this.emailForm = new FormGroup({
            emailId: new FormControl(''),
            contactId: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            emailKind: new FormControl(''),

        });

    }

    public createEMail = (emailFormValue) => {
        if (this.emailForm.valid) {
            this.executeEMailCreate(emailFormValue);
        }
    }

    private executeEMailCreate = (emailFormValue) => {
        const email: EMail = {
            emailId: emailFormValue.emailId,
            contactId: this.contactId,
            email: emailFormValue.email,
            emailKind: emailFormValue.emailKind,
        };

        const apiUrl = 'contact/email/email';
        this.repository.create(apiUrl, email)
            .subscribe(res => {
                this.dialog.closeAll();
            },
                (error => {
                    this.errorService.handleError(error);
                })
            );
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.emailForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.dialog.closeAll();
    }
}


