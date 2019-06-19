import { ContactsService } from '../../core/services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ContactForCreation } from '../../core/interface/contactForCreation.model';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-contact-create',
    templateUrl: './contact-create.component.html',
    styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
    public contactForm: FormGroup;
    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location, private repository: ContactsService, private dialog: MatDialog, private errorService: ErrorHandlerService) { }

    ngOnInit() {
        this.contactForm = new FormGroup({
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            company: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            title: new FormControl('', [Validators.required, Validators.maxLength(60)])

        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.contactForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    public createContact = (contactFormValue) => {
        if (this.contactForm.valid) {
            this.executeContactCreation(contactFormValue);
        }
    }

    private executeContactCreation = (contactFormValue) => {
        const contact: ContactForCreation = {
            firstName: contactFormValue.firstName,
            lastName: contactFormValue.lastName,
            company: contactFormValue.company,
            title: contactFormValue.title,
            imageURL: contactFormValue.imageURL,
            skype: contactFormValue.skype,
            twitter: contactFormValue.twitter,
            notes: contactFormValue.notes,
        };

        const apiUrl = 'contact';
        this.repository.create(apiUrl, contact)
            .subscribe(res => {
                const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

                // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
                dialogRef.afterClosed()
                    .subscribe(result => {
                        this.location.back();
                    });
            },
                (error => {
                    this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                })
            );
    }

}
