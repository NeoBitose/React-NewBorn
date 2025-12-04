import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

if (import.meta.env.DEV) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  root.render(<App />)
}
