import { Injectable, Renderer2 } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StorageKey } from '../../constants/storage-key.const';
import { MenuItem } from '../../models/item.model';
import { HttpBaseService } from '../../services/communicate-server/http-base.service';
import { LocalStorageService } from '../../services/storage/local-storage.service';

const root = '../../../../../assets/json/';
const headerJSON = `${root}items/header.json`;
const languagesJSON = `${root}items/languages.json`;

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    constructor(private localStorageService: LocalStorageService, private httpBaseService: HttpBaseService) {}

    async getNavMenu() {
        return await lastValueFrom<{ menu: MenuItem[] }>(this.httpBaseService.getLocalFile(headerJSON));
    }

    async getLanguages() {
        return await lastValueFrom<{ menu: MenuItem[] }>(this.httpBaseService.getLocalFile(languagesJSON));
    }

    setTheme(oldTheme: string, newTheme: string, renderer2: Renderer2) {
        if (oldTheme) {
            renderer2.removeClass(document.body, `theme-${oldTheme}`);
        }

        this.localStorageService.set(StorageKey.Theme, newTheme);
        renderer2.addClass(document.body, `theme-${newTheme}`);
    }
}
