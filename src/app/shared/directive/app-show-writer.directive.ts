import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appShowWriter]'
})

export class AppShowWriterDirective implements OnInit {
    condition: boolean;
    @Input() set appShowWriter(condition: boolean) {
        this.condition = condition;
    }
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private uS: UserService
    ) { }
    ngOnInit(): void {
        this.uS.isWriter.subscribe((isWriter) => {
            // console.log(isWriter);
            
            if (isWriter && this.condition || !isWriter && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef)
            }
            else {
                this.viewContainer.clear();
            }
        })
    }
}
