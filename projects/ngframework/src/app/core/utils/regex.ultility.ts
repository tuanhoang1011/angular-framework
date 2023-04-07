export class CommonRegex {
    static Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\^$*.[\]{}()?"!@#%&\/\\,><':;|_~`=+-]{8,99}$/;
    static MailSpecial =
        /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    static AlphabetHalfSize = /^[a-zA-Z\s]*$/;
    static AlphabetFullSize = /^[Ａ-ｚ\s]+$/;
    static NumericHalfSize = /^[0-9]*$/;
    static NumericFullSize = /^[０-９]+$/;
    static NumericHalfSizePostalCode = /^[0-9]{7}$/;
    static AlphaNumericHalfSize = /^[a-zA-Z0-9\s]*$/;
    static AlphaNumericFullSize = /^[Ａ-ｚ０-９\s]+$/;
    static KanaSpecialFullSize = /^[ァ-ンー０-９！”＃＄％＆＇（）＝～｜｀｛｝＊＋＜＞？＿－＾＠［；：］，．／￥\s]+$/;
    static HiraganaKanjiKanaFullSizeAlphaNumericSpecialHalfSize =
        /^[ぁ-んァ-ンー一-龥々ヶa-zA-Z0-9０-９!#%&'()=`{}+_\-\^@[;\]\.\s]+$/;
    static HiraganaKanjiKanaFullSizeAlphabetSpecialHalfSize =
        /^[ぁ-んァ-ンー一-龥々ヶa-zA-Z!#%&'()=`{}+_\-\^@[;\]\.\s]+$/;
    static AlphaNumericSpecialHalfSize = /^[a-zA-Z0-9!#%&'()=`{}+_\-\^@[;\]\.\s]*$/;
    static AlphabetSpecialHalfSize = /^[a-zA-Z!#%&'()=`{}+_\-\^@[;\]\.\s]*$/;
    static CodeLength = /^[0-9]{6}$/;
}
