import { LOCALE_LIST, EN } from "@/lib/constants"

export const localeMap = {
    EN: 'en',
    JA: 'ja',
    ES: 'es',
    ZH_CN: 'zh-CN',
    KO: 'ko',
} 
export const defaultLocale = localeMap.EN
export const languages = [defaultLocale, localeMap.JA, localeMap.ES, localeMap.ZH_CN, localeMap.KO]


export const getDefineLocale = (locale:string) => {
    // こうすればOK
    let res = defaultLocale
    Object.values(localeMap).forEach(function (val) {
        if(locale == val) {
            res = val
            return false
        }
    })
    return res
}

export const getDisplayLocale = (locale:string) => {
    const lang = getDefineLocale(locale)
    let res = EN.label
    LOCALE_LIST.forEach((item) => {
        if(lang == item.key){
            res = item.label
            return false
        }
    })
    return res
}