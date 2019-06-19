import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { UsersService } from '../core/services/users.service';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private userService: UsersService,
        private viewContainer: ViewContainerRef
    ) { }

    condition: boolean;

    @Input() set appShowAuthed(condition: boolean) {
        this.condition = condition;
    }
    ngOnInit() {

        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );

        /*
                if (this.userService.isUserAuthenticated()) {

                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
        */
    }


    refresh() {

        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }

}
