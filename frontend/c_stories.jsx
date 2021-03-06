//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';



document.addEventListener('DOMContentLoaded', () => {
  let store;
  // debugger
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
        session_params:{
          favoriteRecipes: window.currentUser.favorite_recipes,
          searchFilters : {}
          }
        }
      };

    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //TODO: remove store from window
  window.store = store


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
