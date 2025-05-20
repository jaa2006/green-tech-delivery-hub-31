
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Initial redirect component to ensure splash screen is shown first
const RedirectToSplash = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/splash');
  }, [navigate]);
  
  return null;
}

createRoot(document.getElementById("root")!).render(<App />);

