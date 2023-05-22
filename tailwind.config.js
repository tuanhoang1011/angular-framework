import { createThemes } from 'tw-colors';

module.exports = {
    prefix: '',
    mode: 'jit',
    content: ['./projects/**/*.{html,ts,scss,css}'],
    safelist: [
        {
            pattern: /grid-(cols|rows)/
        },
        {
            pattern: /gap/
        },
        {
            pattern: /col-span/
        },
        {
            pattern: /row-span/
        },
        {
            pattern: /text-(left|right)/
        },
        {
            pattern: /w-(1\/2|full)/
        }
    ],
    // darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            },

            fontSize: {
                'fs-default': '16px',
                'fs-msg': '14px',
                'fs-icon': '18px'
            },

            minWidth: {
                screen: '100vw',
                support: '1200px',
                'sidebar-expand': '220px',
                'sidebar-collapse': '60px',
                'icon-btn': '35px'
            },

            maxWidth: {
                screen: '100vw',
                support: '1200px',
                'sidebar-expand': '220px',
                'sidebar-collapse': '60px',
                'icon-btn': '35px'
            },

            width: (theme) => ({
                screen: '100vw',
                min: theme('minWidth.support'),
                max: theme('maxWidth.support'),
                'icon-btn': '35px'
            }),

            minHeight: {
                screen: '100vh',
                'icon-btn': '35px'
            },

            maxHeight: {
                screen: '100vh',
                'icon-btn': '35px'
            },

            height: {
                screen: '100vh',
                header: '48px',
                sidebar: 'calc(100vh - 48px)', // minus header height
                'icon-btn': '35px'
            },

            opacity: {
                disable: '0.4',
                hover: '0.6',
                active: '0.8'
            },

            borderRadius: {
                default: '10px'
            },

            boxShadow: {
                'line-bottom': '0 5px 10px -5px',
                line: '0 0px 10px -5px',
                errpage: '5px 5px 30px 20px'
            }
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'focus-visible', 'checked', 'active'],
        boxShadow: ['responsive', 'hover', 'focus', 'focus-visible'],
        boxShadowOutline: ['responsive', 'hover', 'focus', 'checked', 'active'],
        borderColor: ['responsive', 'hover', 'focus', 'focus-visible', 'checked', 'active'],
        borderWidth: ['responsive', 'hover'],
        cursor: ['responsive', 'disabled'],
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        textColor: ['responsive', 'hover', 'focus', 'focus-visible'],
        fill: ['hover', 'focus']
    },
    plugins: [
        createThemes({
            light: {
                // common
                'bg-primary': '#27335a',
                'bg-secondary': '#3c4b76',
                'bg-bg-secondary-blur': '#3c4b76f2',
                primary: '#149eca',
                secondary: '#a0a3ad',
                danger: '#F23645',
                border: '#50535e',
                hyperlink: '#149eca',
                'shadow-outline': '#149ecc80',

                // loading
                mask: '#3c4b76f2',
                'loading-gradient-fr': '#149eca',
                'loading-gradient-to': '#c56dba',

                // text
                'txt-default': '#C8CCD8',
                'txt-title': '#f2f2f2',
                'txt-btn': '#fff',

                // header
                'header-menu': '#ffffff',
                'header-submenu': '#707070',

                // sidebar
                'sidebar-menu': '#707070',
                'sidebar-submenu': '#707070',

                // footer
                'footer-menu': '#707070',
                'footer-submenu': '#707070',

                // dialog
                'dialog-header': '#707070',
                'dialog-content': '#707070',

                // button
                'btn-primary': '#149eca',
                'btn-secondary': '#149eca',
                'btn-danger': '#F23645',
                'btn-icon': '#27335a',

                // message
                success: '#149eca',
                warn: '#cc8925',
                error: '#FC6161',
                info: '#696cff',
                confirm: '#50535e',

                // scrollbar
                scrollbar: '#50535e',
                'scrollbar-hover': '#465268'
            },
            dark: {
                // common
                'bg-primary': '#112324',
                'bg-secondary': '#1a2f30',
                'bg-secondary-blur': '#1a2f30f2',
                primary: '#1ea97c',
                secondary: '#a0a3ad',
                danger: '#F23645',
                border: '#50535e',
                hyperlink: '#1ea97c',
                'shadow-outline': '#1ea97d80',

                // loading
                mask: '#1a2f30f2',
                'loading-gradient-fr': '#00f0fc',
                'loading-gradient-to': '#bcfd02',

                // text
                'txt-default': '#C8CCD8',
                'txt-title': '#f2f2f2',
                'txt-btn': '#fff',

                // header
                'header-menu': '#707070',
                'header-submenu': '#707070',

                // sidebar
                'sidebar-menu': '#707070',
                'sidebar-submenu': '#707070',

                // footer
                'footer-menu': '#707070',
                'footer-submenu': '#707070',

                // dialog
                'dialog-header': '#707070',
                'dialog-content': '#707070',

                // button
                'btn-primary': '#1ea97c',
                'btn-secondary': '#1ea97c',
                'btn-danger': '#F23645',
                'btn-icon': '#112324',

                // message
                success: '#1ea97c',
                warn: '#cc8925',
                error: '#FC6161',
                info: '#696cff',
                confirm: '#50535e',

                // scrollbar
                scrollbar: '#50535e',
                'scrollbar-hover': '#465268'
            }
        })
    ]
};
