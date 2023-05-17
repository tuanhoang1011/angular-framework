import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTabViewComponent } from './dynamic-tab-view.component';

describe('DynamicTabViewComponent', () => {
    let component: DynamicTabViewComponent;
    let fixture: ComponentFixture<DynamicTabViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DynamicTabViewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicTabViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
