import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { MenuItem } from '../../../core/models/item.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    @Input() menuItems?: MenuItem[] = [];
    @Input() type: 'panel' | 'dropdown' = 'dropdown';
    @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
    @Input() styleClass?: string;
    @Output() onClickMenu: EventEmitter<MenuItem> = new EventEmitter();

    constructor() {}

    getItems(items: MenuItem[] | MenuItem[][]) {
        return items as MenuItem[];
    }

    clickMenu(menu: MenuItem) {
        this.onClickMenu?.emit(menu);
    }

    menuById(index, menu) {
        return menu.id;
    }

    subMenuById(index, subMenu) {
        return subMenu.id;
    }
}
