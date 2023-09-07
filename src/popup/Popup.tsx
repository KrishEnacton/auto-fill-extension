import { useState } from 'react'
import Tabs from './components/Tabs'
import AppLogo from './components/AppLogo'
import Home from './components/body/Home'
import Profile from './components/body/Profile'
import Login from './components/body/Login'
import useStorage from '../options/hooks/use-Storage'
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [currentTab, setCurrentTab] = useState(0)
  const { getUserDetails } = useStorage()
  const userLoginDetails: any = getUserDetails()
  return (
    <main className="text-center h-[620px] w-[330px] m-0">
      <HashRouter>
        <Routes>
          <Route
            index={true}
            path="/"
            element={
              <>
                <AppLogo />
                {userLoginDetails && Object.keys(userLoginDetails).length != 0 ? (
                  <> {currentTab == 0 ? <Home /> : <Profile />}</>
                ) : (
                  <Login />
                )}

                <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </main>
  )
}

export default App
