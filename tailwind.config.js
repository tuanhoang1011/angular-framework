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
            colors: {
                body: '#000',
                dialog: '#1e222d',
                'toast-message': '#1e222d',
                'text-primary': '#707070',
                loading: '#707070',
                primary: '#2962ff',
                secondary: '#a0a3ad',
                danger: '#F23645',
                success: '#1ea97c',
                warn: '#cc8925',
                error: '#FC6161',
                info: '#696cff',
                confirm: '#2962ff',
                border: '#707070',
                scrollbar: '#50535e',
                'scrollbar-hover': '#465268',

                // primary
                'btn-primary': '#2962ff',
                // secondary
                'btn-secondary': '#a0a3ad',
                // danger
                'btn-danger': '#F23645'
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
                panel: '0 3px 6px 0 #0000000d'
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
    plugins: []
};
