import React from 'react';
import i18n from 'i18next';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import AppComponent from './App';

import './main.css';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env !== 'production',
    interpolation: {
      escapeValue: false // React escapes by default.
    },
    backend: {
      loadPath: '/static/{{lng}}/{{ns}}.json',
    },
    returnNull: false,
  })
  .then(() => {
    const root = createRoot(document.querySelector('#app'));
    root.render(<AppComponent />);
  });
