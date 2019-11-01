import React from 'react';
import './App.css';
import './assets/Home.css'
import Register from './containers/Register';
import './assets/Content.css'
import { Provider } from 'react-redux'
import store from './store'
import Conteudo from './containers/Conteudo.js'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Conteudo />
        <Register />
      </div>
    </Provider>
  );
}

export default App;
