import { TemplateRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { BaseItem } from './common.model';

export interface StorageItem {
    key?: string;
    value?: string;
}

export interface MenuItem extends BaseItem {
    url?: string;
    styleClass?: string;
    subMenu?: MenuItem[];
    click?: () => void;
}

export interface TabItem extends BaseItem {
    url?: string;
    activated?: boolean;
    templateRef?: TemplateRef<any>;
    styleClass?: string;
    screen?: string;
    rendered?: boolean;
    closable?: boolean;
    headerStyleClass?: string;
}

export interface ImageItem {
    src?: string | SafeUrl;
    alt?: string;
    styleClass?: string;
    height?: number;
    width?: number;
    previewMode?: boolean;
    transformMode?: boolean;
}
