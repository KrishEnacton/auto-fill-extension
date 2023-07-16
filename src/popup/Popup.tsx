import { useState } from 'react'
import Tabs from './components/Tabs'
import AppLogo from './components/AppLogo'
import Home from './components/body/Home'
import Profile from './components/body/Profile'
import Login from './components/body/Login'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')
  const [currentTab, setCurrentTab] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <main className="text-center h-[416px] w-[248px]">
      <AppLogo />
      {isLoggedIn ? <> {currentTab == 0 ? <Home /> : <Profile />}</> : <Login />}

      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </main>
  )
}

export default App
