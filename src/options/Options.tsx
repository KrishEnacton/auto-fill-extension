import { useState } from 'react'
import Layout from './components/Layout'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main>
        <Layout />
    </main>
  )
}

export default App
