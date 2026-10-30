import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LangProvider } from './i18n'
import App from './App'
import './styles.css'
import { initTracking } from './tracking'

initTracking()

// Tải lại trang thì về đầu trang (không để trình duyệt tự khôi phục vị trí cuộn cũ); có #hash thì ScrollManager cuộn tới đó.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (!location.hash) window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
