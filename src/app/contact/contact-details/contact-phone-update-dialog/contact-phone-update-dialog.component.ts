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
    selector: 'app-contact-phone-update-dialog',
    templateUrl: './contact-phone-update-dialog.component.html',
    styleUrls: ['./contact-phone-update-dialog.component.css']
})
export class ContactPhoneUpdateDialogComponent implements OnInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' }
    ];
    phoneId: string;
    public phone: Phone;
    public phoneForm: FormGroup;

    constructor(
        private location: Location,

        private repository: ContactsService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialogRef: MatDialogRef<ContactPhoneUpdateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.phoneId = data.phoneId;
    }

    ngOnInit() {

        this.phoneForm = new FormGroup({
            phoneId: new FormControl(''),
            contactId: new FormControl(''),
            phone: new FormControl('', [Validators.required]),
            phoneKind: new FormControl(''),

        });

        this.getPhoneDetails();


    }
    private getPhoneDetails = () => {

        const apiUrl = `contact/phone/phone/${this.phoneId}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.phone = res as Phone;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.phoneForm.controls['phoneId'].setValue(this.phone.phoneId);
        this.phoneForm.controls['contactId'].setValue(this.phone.contactId);
        this.phoneForm.controls['phone'].setValue(this.phone.phone);
        this.phoneForm.controls['phoneKind'].setValue(this.phone.phoneKind);
    }

    public updatePhone = (phoneFormValue) => {
        if (this.phoneForm.valid) {
            this.executePhoneUpdate(phoneFormValue);
        }
    }

    private executePhoneUpdate = (phoneFormValue) => {
        const phone: Phone = {
            phoneId: phoneFormValue.phoneId,
            contactId: phoneFormValue.contactId,
            phone: phoneFormValue.phone,
            phoneKind: phoneFormValue.phoneKind,
        };

        const apiUrl = 'contact/phone/phone';
        this.repository.update(apiUrl, phone)
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


