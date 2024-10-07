import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import { GalleryStore } from './User/Context/GalleryStore.jsx';
import { ProjectProvider } from './User/Context/ProjectProvidor.jsx';
import AboutProvidor from "./User/Context/AboutProvidor.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GalleryStore>
            <ProjectProvider>
                <AboutProvidor>
                <App />
                </AboutProvidor>
            </ProjectProvider>
        </GalleryStore>
    </React.StrictMode>
);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import { GalleryStore } from './User/Context/GalleryStore.jsx';
import { ProjectProvider } from './User/Context/ProjectProvidor.jsx'; // Ensure correct import

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GalleryStore>
            <ProjectProvider>
                <App />
            </ProjectProvider>
        </GalleryStore>
    </React.StrictMode>
);
*/
