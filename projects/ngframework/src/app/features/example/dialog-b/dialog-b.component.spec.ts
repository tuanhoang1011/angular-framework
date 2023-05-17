import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBComponent } from './dialog-b.component';

describe('DialogBComponent', () => {
    let component: DialogBComponent;
    let fixture: ComponentFixture<DialogBComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogBComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DialogBComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
