import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase/index'
import { useLocalStorage } from './use-localStorage'

export function useSupabase() {
  const navigate = useNavigate()
  const { getLocalStorage } = useLocalStorage()
  async function loginWithEmailPassword({ email, password }: any) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data.user))
      return { data, error }
    } catch (e) {
      return { data: null, error: true }
    }
  }

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      return { data, error }
    } catch (error) {
      console.log(error)
      return { data: null, error: true }
    }
  }

  // async function signInWithGitHub() {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: 'github',
  //     })
  //     return { data, error }
  //   } catch (error) {
  //     return { data: null, error: true }
  //   }
  // }

  async function signUp({ email, password }: any) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data.user))
      return { data, error }
    } catch (error) {
      return error
    }
  }

  async function signOut() {
    const response = getLocalStorage('user')
    const authResponse = getLocalStorage('sb-fxwbkyonnbbvdnqbmppu-auth-token')
    const userId: string = response?.id ?? authResponse?.user?.id
    const { data } = await supabase.auth.admin.deleteUser(userId)
    const { error: signOutError } = await supabase.auth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('users')
    navigate('/login')
    // location && location.reload()
    return { signOutError } ?? true
  }

  return {
    loginWithEmailPassword,
    signInWithGoogle,
    // signInWithGitHub,
    signUp,
    signOut,
  }
}
