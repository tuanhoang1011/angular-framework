import { SafeUrl } from '@angular/platform-browser';

export interface ImageView {
    src?: string | SafeUrl;
    alt?: string;
    styleClass?: string;
    height?: number;
    width?: number;
    previewMode?: boolean;
    transformMode?: boolean;
}
