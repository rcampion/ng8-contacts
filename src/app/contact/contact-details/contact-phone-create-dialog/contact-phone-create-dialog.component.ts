import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ContactsService } from '../../../core/services/contacts.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Phone } from '../../../core/interface/phone.model';

export interface PhoneType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-contact-phone-create-dialog',
    templateUrl: './contact-phone-create-dialog.component.html',
    styleUrls: ['./contact-phone-create-dialog.component.css']
})
export class ContactPhoneCreateDialogComponent implements OnInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' }
    ];

    contactId: string;
    public phone: Phone;
    public phoneForm: FormGroup;

    constructor(
        private location: Location,

        private repository: ContactsService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialogRef: MatDialogRef<ContactPhoneCreateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit() {

        this.phoneForm = new FormGroup({

            contactId: new FormControl(''),
            phone: new FormControl('', [Validators.required]),
            phoneKind: new FormControl(''),

        });

    }

    public createPhone = (phoneFormValue) => {
        if (this.phoneForm.valid) {
            this.executePhoneCreate(phoneFormValue);
        }
    }

    private executePhoneCreate = (phoneFormValue) => {
        const phone: Phone = {
            phoneId: phoneFormValue.phoneId,
            contactId: this.contactId,
            phone: phoneFormValue.phone,
            phoneKind: phoneFormValue.phoneKind,
        };

        const apiUrl = 'contact/phone/phone';
        this.repository.create(apiUrl, phone)
            .subscribe(res => {
                this.dialog.closeAll();
            },
                (error => {
                    this.errorService.handleError(error);
                })
            );
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.phoneForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.dialog.closeAll();
    }
}



