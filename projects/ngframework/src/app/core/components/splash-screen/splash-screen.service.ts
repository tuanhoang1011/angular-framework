import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SplashScreenService {
    public splashScreenSubject = new BehaviorSubject<boolean>(false);
    public splashScreen$ = this.splashScreenSubject.asObservable();

    show = () => this.splashScreenSubject.next(true);

    hide = () => this.splashScreenSubject.next(false);
}
