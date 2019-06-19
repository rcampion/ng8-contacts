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
    selector: 'app-contact-email-update-dialog',
    templateUrl: './contact-email-update-dialog.component.html',
    styleUrls: ['./contact-email-update-dialog.component.css']
})
export class ContactEmailUpdateDialogComponent implements OnInit {
    emailId: string;
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

        private dialogRef: MatDialogRef<ContactEmailUpdateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.emailId = data.emailId;
    }

    ngOnInit() {

        this.emailForm = new FormGroup({
            emailId: new FormControl(''),
            contactId: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            emailKind: new FormControl(''),

        });

        this.getEMailDetails();

    }
    private getEMailDetails = () => {

        const apiUrl = `contact/email/email/${this.emailId}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.email = res as EMail;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.emailForm.controls['emailId'].setValue(this.email.emailId);
        this.emailForm.controls['contactId'].setValue(this.email.contactId);
        this.emailForm.controls['email'].setValue(this.email.email);
        this.emailForm.controls['emailKind'].setValue(this.email.emailKind);

    }

    public updateEMail = (emailFormValue) => {
        if (this.emailForm.valid) {
            this.executeEMailUpdate(emailFormValue);
        }
    }

    private executeEMailUpdate = (emailFormValue) => {
        const email: EMail = {
            emailId: emailFormValue.emailId,
            contactId: emailFormValue.contactId,
            email: emailFormValue.email,
            emailKind: emailFormValue.emailKind,
        };

        const apiUrl = 'contact/email/email';
        this.repository.update(apiUrl, email)
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

    selected(event) {
        const target = event.source.selected._element.nativeElement;
        const selectedData = {
            value: event.value,
            text: target.innerText.trim()
        };
        console.log(selectedData);
    }
}

