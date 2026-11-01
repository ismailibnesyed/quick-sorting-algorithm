import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Quick_sort from './Quick_sort.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Quick_sort />
  </StrictMode>,
)
