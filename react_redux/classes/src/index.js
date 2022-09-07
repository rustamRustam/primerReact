import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import { Provider } from 'react-redux'
import { store } from './store/configure';

import App from './components/App/App';
const root = ReactDOM.createRoot(document.getElementById('root'));

const toogleDarkTema = function(){
  document.body.classList.toggle("finter-invert");
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App darkTema={toogleDarkTema} />
    </Provider>
  </React.StrictMode>
);
