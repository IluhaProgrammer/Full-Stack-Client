import React from 'react';
import AppRouter from './routers/AppRouter';
import './styles/main.scss'
import Header from './components/header/header'

function App() {
  return (
    <div className="App">
      <Header/>
      <AppRouter/>
    </div>
  );
}

export default App;
