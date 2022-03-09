import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

function init() {
  i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    },
    backend: {
      // loadPath: () => {
      //   // check the domain
      //   const host = window.location.host
      //   return (host === 'production.ltd' ? '' : 'jotters') + '/locales/{{lng}}/translation.json'
      // }
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })
}

const i18nService = {
  init
}

export default i18nService
