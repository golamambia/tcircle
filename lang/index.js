import eng from './eng';
import ben from './ben';
import hin from './hin';
const defaultLang = 'eng';
//const userLang = typeof window !== "undefined" ? localStorage.getItem("lang") || defaultLang : defaultLang;

export default function getLabelLanguage(key) {
  switch(defaultLang) {
    case 'eng':
        return eng[key];
    case 'bn':
        return ben[key] ? ben[key] : eng[key];
    case 'hn':
        return hin[key] ? hin[key] : eng[key];
    default:
        return eng[key];
  }
}
