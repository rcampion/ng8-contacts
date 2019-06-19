import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ContactsService } from '../core/services/contacts.service';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { EMail } from '../core/interface/email.model';
import { EMailSend } from '../core/interface/emailSend.model';
import { SuccessDialogComponent } from './../shared/dialogs/success-dialog/success-dialog.component';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
    emailId: string;
    public email: EMail;
    public emailForm: FormGroup;
    private dialogConfig;

    constructor(
        private location: Location,

        private repository: ContactsService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.emailId = this.activeRoute.snapshot.params['id'];

        this.emailForm = new FormGroup({
            emailSubjectTxt: new FormControl(''),
            emailList: new FormControl(''),
            emailFirstName: new FormControl(''),
            emailFromAddress: new FormControl(''),
            emailMsgTxt: new FormControl(''),

        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

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
        // this.emailForm.controls['emailSubjectTxt'].setValue(this.email.emailId);
        this.emailForm.controls['emailList'].setValue(this.email.email);
        // this.emailForm.controls['emailFirstName'].setValue(this.email.email);
        // this.emailForm.controls['emailFromAddress'].setValue(this.email.emailKind);
        // this.emailForm.controls['emailMsgTxt'].setValue(this.email.emailKind);

    }
    public sendEMail = (emailFormValue) => {
        if (this.emailForm.valid) {
            this.executeSendEMail(emailFormValue);
        }
    }

    private executeSendEMail = (emailFormValue) => {
        const emailSend: EMailSend = {
            emailSubjectTxt: emailFormValue.emailSubjectTxt,
            emailList: emailFormValue.emailList,
            emailFirstName: emailFormValue.emailFirstName,
            emailFromAddress: emailFormValue.emailFromAddress,
            emailMsgTxt: emailFormValue.emailMsgTxt,

        };

        const apiUrl = 'contact/email/send';
        this.repository.create(apiUrl, emailSend)
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
    public onCancel = () => {
        this.location.back();
    }
}
