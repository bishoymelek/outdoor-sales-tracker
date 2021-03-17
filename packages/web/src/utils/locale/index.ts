import localeConfig from './config';

const getLanguage = (): string => window.localStorage.i18nextLng || null;

export { getLanguage };
export default localeConfig;
