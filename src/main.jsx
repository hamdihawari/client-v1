import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import { GalleryStore } from './User/Context/GalleryStore.jsx';
import AboutProvider from "./User/Context/AboutProvider.jsx";
import { Provider } from 'react-redux';
import {store} from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GalleryStore>
            <AboutProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </AboutProvider>
        </GalleryStore>
    </React.StrictMode>
);
