import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PrestadorProvider } from './contexts/prestador.context';
import { UserProvider } from './contexts/user.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PrestadorProvider>
          <App />
        </PrestadorProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
