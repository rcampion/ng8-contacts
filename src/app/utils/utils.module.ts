import { NgModule } from '@angular/core';
import { IsAuthorizedDirective } from './is-authorized.directive';

@NgModule({
    bootstrap: [ ],
    declarations: [ IsAuthorizedDirective ],
    exports: [ IsAuthorizedDirective ]
})
export class UtilsModule { }
