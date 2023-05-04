import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDateSelectorComponent } from './range-date-selector.component';

describe('RangeDateSelectorComponent', () => {
    let component: RangeDateSelectorComponent;
    let fixture: ComponentFixture<RangeDateSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RangeDateSelectorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RangeDateSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
