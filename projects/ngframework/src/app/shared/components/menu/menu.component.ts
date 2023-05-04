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
    @Input() menus?: MenuItem[] = [];
    @Input() styleClass?: string;
    @Input() subMenuStyleClass?: string;
    @Output() onClickMenu: EventEmitter<MenuItem> = new EventEmitter();
    @Output() onClickSubMenu: EventEmitter<{ menu: MenuItem; subMenu: MenuItem }> = new EventEmitter();

    constructor() {}

    clickMenu(menu: MenuItem) {
        this.onClickMenu?.emit(menu);
    }

    clickSubMenu(menu: MenuItem, subMenu: MenuItem) {
        this.onClickSubMenu?.emit({ menu, subMenu });
    }

    menuById(index, menu) {
        return menu.id;
    }

    subMenuById(index, subMenu) {
        return subMenu.id;
    }
}
