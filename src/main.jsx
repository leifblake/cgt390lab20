// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';     
import store from './store';               
import { ModeProvider } from './ModeContext'; 
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModeProvider>
    </Provider>
  </StrictMode>
);
