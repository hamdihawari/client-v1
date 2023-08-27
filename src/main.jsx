import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'
import { GalleryStore } from './User/Context/GalleryStore.jsx'
import { ProjectStory } from './User/Context/ProjectStory.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GalleryStore>
      <ProjectStory>
        <App />
      </ProjectStory>
    </GalleryStore>
  </React.StrictMode>,
)