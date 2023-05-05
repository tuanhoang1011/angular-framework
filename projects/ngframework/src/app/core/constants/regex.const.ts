export const CommonRegex = Object.freeze({
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\^$*.[\]{}()?"!@#%&\/\\,><':;|_~`=+-]{8,99}$/,
    MailSpecial:
        /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    AlphabetHalfSize: /^[a-zA-Z\s]*$/,
    AlphabetFullSize: /^[Ａ-ｚ\s]+$/,
    NumericHalfSize: /^[0-9]*$/,
    NumericFullSize: /^[０-９]+$/,
    NumericHalfSizePostalCode: /^[0-9]{7}$/,
    AlphaNumericHalfSize: /^[a-zA-Z0-9\s]*$/,
    AlphaNumericFullSize: /^[Ａ-ｚ０-９\s]+$/,
    KanaSpecialFullSize: /^[ァ-ンー０-９！”＃＄％＆＇（）＝～｜｀｛｝＊＋＜＞？＿－＾＠［；：］，．／￥\s]+$/,
    HiraganaKanjiKanaFullSizeAlphaNumericSpecialHalfSize:
        /^[ぁ-んァ-ンー一-龥々ヶa-zA-Z0-9０-９!#%&'()=`{}+_\-\^@[;\]\.\s]+$/,
    HiraganaKanjiKanaFullSizeAlphabetSpecialHalfSize: /^[ぁ-んァ-ンー一-龥々ヶa-zA-Z!#%&'()=`{}+_\-\^@[;\]\.\s]+$/,
    AlphaNumericSpecialHalfSize: /^[a-zA-Z0-9!#%&'()=`{}+_\-\^@[;\]\.\s]*$/,
    AlphabetSpecialHalfSize: /^[a-zA-Z!#%&'()=`{}+_\-\^@[;\]\.\s]*$/,
    CodeLength: /^[0-9]{6}$/
});
