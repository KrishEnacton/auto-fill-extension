import { useState } from 'react'
import InputDropdown from './components/dropdowns/InputDropdown'
import Layout from './components/Layout'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main>
      <div className="text-lg ">
        <Layout />
        {/* <InputDropdown /> */}
      </div>
    </main>
  )
}

export default App
