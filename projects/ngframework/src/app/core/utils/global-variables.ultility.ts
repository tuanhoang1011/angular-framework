export class GlobalVariables {
    // map to value in config files
    static messageLifeTimeMilSecond = 3000;
    static version = '';
    static defaultLanguage = 'en';
    static logMaxBundleSize = 500;
    static requestHTTPTimeoutMilSecond = 60000;
    static language = 'en';
    static autoSignOutIntervalMilSecond = 2000;
    static autoSignOutDurationMinute = 15;
    static splashScreenDurationMilSecond = 2000;
    // other
    static pendingAutoSignOut = false;
    static isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    static isMac = /Mac/i.test(navigator.userAgent);
    static isOldEdge = /(Edge\/)/i.test(navigator.userAgent);
    static isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    static isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    static isFirefox = /firefox/i.test(navigator.userAgent);
}
