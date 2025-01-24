import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BreakpointProvider } from './contexts/BreakpointContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BreakpointProvider>
      <App />
    </BreakpointProvider>
  </StrictMode>
);
