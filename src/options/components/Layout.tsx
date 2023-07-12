import React, { useEffect } from 'react'
import Form from './generic/Form'
import Tabs from './Tabs'
import { useLocalStorage } from '../hooks/use-localStorage'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../hooks/use-Supabase'

export default function Layout() {
  const { getLocalStorage } = useLocalStorage()
  const { signOut } = useSupabase()
  const navigate = useNavigate()

  useEffect(() => {
    const response = getLocalStorage('user')
    const authResponse = getLocalStorage('sb-fxwbkyonnbbvdnqbmppu-auth-token')
    if (!response?.email && !authResponse?.user?.id) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="flex bg-custom_white flex-col items-center min-h-screen">
      <div className="mt-14 mb-8">
        <Tabs />
      </div>
      <Form />
      <button onClick={signOut}>logout</button>
    </div>
  )
}
