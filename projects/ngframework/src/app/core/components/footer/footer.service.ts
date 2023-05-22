import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { MenuItem } from '../../models/item.model';
import { HttpBaseService } from '../../services/http-base.service';

const root = '../../../../../assets/json/';
const footerJSON = `${root}items/footer.json`;

@Injectable({
    providedIn: 'root'
})
export class FooterService {
    constructor(private httpBaseService: HttpBaseService) {}

    async getNavMenu() {
        return await lastValueFrom<{ menu: MenuItem[] }>(this.httpBaseService.getLocalFile(footerJSON));
    }
}
