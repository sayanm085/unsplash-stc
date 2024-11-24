import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './components/Loader'
import { lazy ,Suspense} from 'react'

const App = lazy(() => import('./App.jsx'))



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
        <App />
    </Suspense>
  </StrictMode>,
)
