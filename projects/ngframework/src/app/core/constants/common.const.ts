export const CommonConstant = {
    NA: 'N/A',

    Language: {
        English: { value: 0, label: 'English', sortLabel: 'en' },
        Vietnamese: { value: 1, label: 'Tiếng Việt', sortLabel: 'vn' }
    },

    Gender: [
        { value: 0, label: 'LBL_0001' },
        { value: 1, label: 'LBL_0002' },
        { value: 2, label: 'N/A' }
    ],

    ActiveStatus: {
        Active: { value: 0, label: 'LBL_0003' },
        InActive: { value: 1, label: 'LBL_0004' }
    },

    DefaultDate: new Date(1920, 1, 1, 0, 0, 0, 0),

    ImageRatio: {
        Square: { ratio: 1 / 1, width: 1, height: 1 },
        Thumbnail: { ratio: 300 / 200, width: 300, height: 200 },
        Preview: { ratio: 900 / 600, width: 900, height: 600 }
    }
};
