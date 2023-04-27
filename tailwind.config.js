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
            fontSize: {
                'fs-default': '16px',
                'fs-msg': '14px'
            },

            minWidth: {
                support: '1366px'
            },

            maxWidth: {
                support: '1920px'
            },

            width: (theme) => ({
                min: theme('minWidth.support'),
                max: theme('maxWidth.support')
            }),

            height: {
                header: '35px'
            },

            boxShadow: {
                default: '0px 1px 8px #0000000D',
                header: '0 5px 5px 0 #0000000d',
                dialog: '5px 5px 10px #00000033',
                'text-box': '0 0 0 0.2rem #eff0e0',
                panel: '0 3px 6px 0 #0000000d',

                errpage: '5px 5px 40px 5px #14380c'
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
            default: {
                // common
                body: '#000',
                primary: '#1ea97c',
                secondary: '#a0a3ad',
                danger: '#F23645',
                border: '#707070',
                hyperlink: '#1ea97c',

                // loading
                mask: '#1e222dcc',
                'loading-gradient-fr': '#00f0fc',
                'loading-gradient-to': '#bcfd02',

                // text
                'tc-default': '#f2f2f2',
                'tc-btn': '#fff',

                // header
                header: '#1e222d',
                'header-menu': '#707070',
                'header-submenu': '#707070',

                // sidebar
                sidebar: '#1e222d',
                'sidebar-menu': '#707070',
                'sidebar-submenu': '#707070',

                // footer
                footer: '#1e222d',
                'footer-menu': '#707070',
                'footer-submenu': '#707070',

                // dialog
                dialog: '#1e222d',
                'dialog-header': '#707070',
                'dialog-content': '#707070',

                // button
                'btn-primary': '#1ea97c',
                'btn-secondary': '#1ea97c',
                'btn-danger': '#F23645',
                'btn-close-icon': '#1e222d',

                // message
                'toast-message': '#1e222d',
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
