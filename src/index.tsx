import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import {ConfigProvider, theme} from 'antd'
import Auth from './store/reducers/auth';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}} >
      <Provider store={store} >
        <Auth>
          <App/>
        </Auth>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);

