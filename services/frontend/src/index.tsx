import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';  // Replace index.css with our new base.css
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);