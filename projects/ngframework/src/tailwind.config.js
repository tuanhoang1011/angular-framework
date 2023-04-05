module.exports = {
    prefix: '',
    mode: 'jit',
    content: ['./projects/ngframework/**/*.{html,ts,scss,css}'],
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
                primary: '#15CCAE',
                secondary: '#15CCAE',
                danger: '#15CCAE'
            },

            minWidth: {
                support: '1366px'
            },

            maxWidth: {
                support: '1920px'
            },

            width: (theme) => ({
                sidebar: '70px',
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
