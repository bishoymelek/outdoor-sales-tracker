import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { StateManager } from 'react-state';
import App from './App';
import './polyfill';
import * as serviceWorker from './serviceWorker';
import { SynthesizedSpinner } from './components';
import { storeConfig } from './store-config';
import * as dataProviders from './store-config/dataproviders';
import './utils/locale';

ReactDOM.render(
  <StateManager storeConfig={storeConfig} dataProviders={dataProviders}>
    <React.Suspense fallback={<SynthesizedSpinner psid="layout" />}>
      <App />
    </React.Suspense>
  </StateManager>,
  document.getElementById('root')
);

serviceWorker.unregister();
