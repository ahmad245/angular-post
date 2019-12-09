import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appShowSuperAdmin]'
})

export class AppShowSuperAdminDirective implements OnInit {
    condition: boolean;
    @Input() set appShowSuperAdmin(condition: boolean) {
        this.condition = condition;
    }
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private uS: UserService
    ) { }
    ngOnInit(): void {
        this.uS.isSuperAdmin.subscribe((isSuperAdmin) => {
            if (isSuperAdmin && this.condition || !isSuperAdmin && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef)
            }
            else {
                this.viewContainer.clear();
            }
        })
    }
}
