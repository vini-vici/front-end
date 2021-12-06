// import 'react-hot-loader';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import AppComponent from './App';

import './main.css';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // .addResource('a','b','c', 'd')
  .init({
    fallbackLng: 'es',
    debug: import.meta.env !== 'production',
    interpolation: {
      escapeValue : false // React escapes by default.
    },
    backend: {
      loadPath: '/static/{{lng}}/{{ns}}.json',
    }
  })
  .then(() => {
    render(<AppComponent />, document.querySelector('#app'));
  });
