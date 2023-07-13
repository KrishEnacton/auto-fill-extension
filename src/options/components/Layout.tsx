import React, { useEffect, useState } from 'react'
import Form from './generic/Form'
import Tabs from './Tabs'
import { useLocalStorage } from '../hooks/use-localStorage'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../hooks/use-Supabase'

export default function Layout() {
  const { getLocalStorage } = useLocalStorage()
  const [loading, setLoading] = useState(false)
  const { signOut } = useSupabase()
  const navigate = useNavigate()

  useEffect(() => {
    const response = getLocalStorage('user')
    setLoading(true)
    const authResponse = getLocalStorage('sb-fxwbkyonnbbvdnqbmppu-auth-token')
    if (!response?.email && !authResponse?.user?.id) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      {loading && (
        <div className="flex bg-custom_white flex-col items-center min-h-screen">
          <div className="mt-14 mb-8">
            <Tabs />
          </div>
          <Form />
          <button onClick={signOut}>logout</button>
        </div>
      )}
    </>
  )
}
