import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './lib/theme-provider';
import { UserProvider } from './provider/user';
import { EventsProvider } from './provider/events';
import { LocalStorageProvider } from './provider/local-storage';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <EventsProvider>
            <LocalStorageProvider>
              <App />
            </LocalStorageProvider>
          </EventsProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
