export const LogLevel = {
    All: 'All',
    Operation: 'Operation',
    Error: 'Error',
    Info: 'Info',
    Warn: 'Warn',
    Debug: 'Debug',
    Off: 'Off'
};

export const LogType = {
    Action: 'Action',
    Error: 'Error'
};

export const LogMessage = {
    Unknown: 'Unknown',
    NoNetwork: 'Disconnected Internet'
};

export const LogIdentiferFormat = {
    Menu: 'Menu: %s',
    Breadcrumb: 'Breadcrumb: %s',
    Button: 'Button: %s',
    Hyperlink: 'Hyperlink: %s',
    TableItem: 'Table: %s; %s: %s',
    Tab: 'Tab: %s',
    MessageButton: 'Message: %s; Button: %s'
};

export const LogSubType = {
    HyperLink: 'HyperLink',
    Button: 'Button',
    TableItemSelection: 'TableItemSelection',
    Menu: 'Menu',
    ScreenTransition: 'ScreenTransition',
    APIError: 'APIError',
    Exception: 'Exception'
};

export const LogActiveScreen = {
    ScreenEx1: {
        List: 'Screen-1-list',
        Create: 'Screen-1-Create',
        Edit: 'Screen-1-Edit',
        Detail: 'Screen-1-Detail'
    },
    ErrorPage: 'Error-page',
    SignIn: 'Sign-in-page'
};

export const LogTableIdentifier = {
    ScreenEx1: {
        List: 'Screen-1-list-table',
        ChildList1: 'Child-list-1-table'
    }
};
