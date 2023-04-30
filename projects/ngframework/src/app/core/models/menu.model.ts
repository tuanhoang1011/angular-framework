export interface MenuItem {
    id?: string;
    label?: string;
    imgIcon?: string;
    imgIconAlt?: string;
    icon?: string;
    url?: string;
    disabled?: boolean;
    styleClass?: string;
    subMenu?: MenuItem[];
    click?: () => void;
}
