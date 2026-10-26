import { createRoot } from 'react-dom/client'
import '@fontsource-variable/montserrat/wght.css'
import '@fontsource-variable/montserrat/wght-italic.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { lockZoom } from './config/kiosk'

lockZoom()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)