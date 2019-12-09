import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appShowUpdater]'
})

export class AppShowUpdaterDirective implements OnInit {
    condition: boolean;
    @Input() set appShowUpdater(condition: boolean) {
        this.condition = condition;
    }
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private uS: UserService
    ) { }
    ngOnInit(): void {
        this.uS.isUpdater.subscribe((isUpdater) => {
            if (isUpdater && this.condition || !isUpdater && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef)
            }
            else {
                this.viewContainer.clear();
            }
        })
    }
}
