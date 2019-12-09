import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appShowDeleter]'
})

export class AppShowDeleterDirective implements OnInit {
    condition: boolean;
    @Input() set appShowDeleter(condition: boolean) {
        this.condition = condition;
    }
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private uS: UserService
    ) { }
    ngOnInit(): void {
        this.uS.isDeleter.subscribe((isDeleter) => {
            if (isDeleter && this.condition || !isDeleter && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef)
            }
            else {
                this.viewContainer.clear();
            }
        })
    }
}
