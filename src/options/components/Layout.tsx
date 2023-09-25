import React, { useEffect, useState } from 'react'
import Form from './generic/Form'
import Logout from './generic/Logout'
import Tabs from './Tabs'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/use-localStorage'

export default function Layout() {
  const navigate = useNavigate()
  const { getLocalStorage } = useLocalStorage()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const response = getLocalStorage('user')
    const authResponse = getLocalStorage('sb-tjffakoooclofjvodqsx-auth-token')
    if (!response?.email && !authResponse?.user?.id) {
      navigate('/login')
    } else {
      setLoading(false)
    }
  }, [])
  return (
    <div className="flex bg-custom_white flex-col items-center min-h-screen">
      <div className="mt-14 mb-8 flex space-x-3">
        <Tabs />
        <Logout />
      </div>
      <Form />
    </div>
  )
}
