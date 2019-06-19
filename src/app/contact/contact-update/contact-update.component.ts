import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Contact } from '../../core/interface/contact.model';
// import { ContactForCreation } from '../../_interface/contactForCreation.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../core/services/contacts.service';

import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-contact-update',
    templateUrl: './contact-update.component.html',
    styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {
    public contact: Contact;
    public contactForm: FormGroup;

    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location, private repository: ContactsService, private dialog: MatDialog,
        router: Router,
        private activeRoute: ActivatedRoute, private errorService: ErrorHandlerService) { }


    ngOnInit() {

        this.contactForm = new FormGroup({
            id: new FormControl(''),
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

        this.getContactDetails();


    }
    private getContactDetails = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `contact/${id}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.contact = res as Contact;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.contactForm.controls['id'].setValue(this.contact.id);
        this.contactForm.controls['firstName'].setValue(this.contact.firstName);
        this.contactForm.controls['lastName'].setValue(this.contact.lastName);
        this.contactForm.controls['company'].setValue(this.contact.company);
        this.contactForm.controls['title'].setValue(this.contact.title);
    }
    public updateContact = (contactFormValue) => {
        if (this.contactForm.valid) {
            this.executeContactUpdate(contactFormValue);
        }
    }

    private executeContactUpdate = (contactFormValue) => {
        const contact: Contact = {
            id: contactFormValue.id,
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
        this.repository.update(apiUrl, contact)
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

    public hasError = (controlName: string, errorName: string) => {
        return this.contactForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

}
