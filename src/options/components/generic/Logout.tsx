import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../../hooks/use-Supabase'
import { useLocalStorage } from '../../hooks/use-localStorage'

export default function Logout() {
  const { getLocalStorage } = useLocalStorage()
  const [loading, setLoading] = useState(false)
  const { signOut } = useSupabase()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

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
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-base px-3 py-1 text-sm  text-black shadow-sm hover:bg-base/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 font-bold focus-visible:outline-base"
      >
        Logout <ArrowRightOnRectangleIcon className="h-5 w-5" />
      </button>
      <CustomModal
        confirm={handleLogout}
        id={''}
        closeModal={() => {
          setIsOpen(false)
        }}
        isOpen={isOpen}
        modal_title={`You logging out!!`}
        modal_description={`Are you sure you want to logout?`}
      />
    </>
  )
}
