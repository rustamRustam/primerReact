import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';


// Инициализация
const persistedState = ()=>{
  let result = {};
  if(localStorage.hasOwnProperty('collection_rr')) {
    const _data = localStorage.getItem('collection_rr');
    if (_data && _data != 'undefined') {
      Object.assign(result, JSON.parse(_data));
    }
  }

  return result;
}

export const store = createStore(
  rootReducer,
  persistedState(),
  applyMiddleware(thunk),
);

// Сохранение при каждом обновлении
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('collection_rr', JSON.stringify({
    collection: state.collection,
  }));
});

window.onstorage = event => {
  // тут обработать изменения в другом окне
};
