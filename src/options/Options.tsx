import { useState } from 'react'
import Layout from './components/Layout'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main>
        <Layout />
        <ToastContainer/>
    </main>
  )
}

export default App
