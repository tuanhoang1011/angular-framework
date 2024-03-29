import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { differenceInCalendarDays, endOfDay, endOfToday, startOfDay } from 'date-fns';

import { CommonConstant } from '../../../core/constants/common.const';
import { RangeDate } from '../../../core/models/common.model';
import { isNullOrUndefined } from '../../../core/utils/common-func.ultility';
import { generateDateToBefore, startOfNextDay } from '../../../core/utils/date.ultility';

@Component({
    selector: 'app-range-date-selector',
    templateUrl: './range-date-selector.component.html',
    styleUrls: ['./range-date-selector.component.scss']
})
export class RangeDateSelectorComponent implements OnInit {
    @Input() hasChangeDate?: boolean;
    @Input() min: Date = CommonConstant.CalendarConstant.MinDate;
    @Input() max: Date = CommonConstant.CalendarConstant.MaxDate;
    @Input() from?: Date;
    @Input() to?: Date;
    @Output() onSelectDate = new EventEmitter<RangeDate>();

    rangeDay?: number;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        try {
            if (!this.from || !this.to) {
                this.to = endOfToday();
                this.from = generateDateToBefore(this.to, 1, 'month').from!;
                this.initRangeDay();

                this.cdr.markForCheck();
            }
        } catch (error) {
            throw error;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        try {
            if (!isNullOrUndefined(changes['hasChangeDate']?.currentValue)) {
                this.initRangeDay();
                this.cdr.markForCheck();
            }
        } catch (error) {
            throw error;
        }
    }

    initRangeDay() {
        try {
            this.rangeDay = differenceInCalendarDays(startOfNextDay(this.to!), this.from!);
            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    selectDate(selectedDate: Date, type: 'from' | 'to') {
        try {
            if (type === 'from') {
                this.from = startOfDay(selectedDate);

                if (this.from > this.to!) {
                    this.to = undefined!;
                }
            } else {
                this.to = endOfDay(selectedDate);

                if (this.to < this.from!) {
                    this.from = undefined!;
                }
            }
            this.initRangeDay();

            this.onSelectDate.emit({
                from: this.from,
                to: this.to
            });
        } catch (error) {
            throw error;
        }
    }
}
