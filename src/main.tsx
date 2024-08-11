import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { MenuProvider } from './contexts/MenuContext.tsx';
import { router } from './routes/router.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
