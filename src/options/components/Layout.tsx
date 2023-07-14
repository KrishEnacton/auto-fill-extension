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

  const handleLogout = async () => {
    setLoading(false)
    await signOut()
    navigate('/login')
  }

  return (
    <>
      {loading && (
        <div className='flex h-screen bg-custom_white'>
          {/* Sidebar */}
          <div className='w-64 bg-gray-800 text-white'>
            <div className='flex flex-col h-full justify-between'>
              {/* User Info */}
              <div className='p-4'>
                <h2 className='text-2xl font-bold'>John Doe</h2>
                <p className='text-sm'>Position: Manager</p>
              </div>
              {/* Logout Button */}
              <div className='p-4'>
                <button
                  onClick={handleLogout}
                  className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:bg-red-600 focus:outline-none'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col flex-1'>
            <div className='p-6'>
              <Tabs />
            </div>
            <div className='p-6'>
              <Form />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
