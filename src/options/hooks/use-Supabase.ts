import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase/index'

export function useSupabase() {
  const navigate = useNavigate()
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

  async function signInWithGitHub() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      })
      return { data, error }
    } catch (error) {
      return { data: null, error: true }
    }
  }

  async function signUp({ email, password }: any) {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data.user))
      return data.user
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    localStorage.setItem('user', JSON.stringify(null))
    navigate('/login')
    return error ?? true
  }
  return {
    loginWithEmailPassword,
    signInWithGoogle,
    signInWithGitHub,
    signUp,
    signOut,
  }
}
