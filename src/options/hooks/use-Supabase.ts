import { supabase } from '../../supabase/index'

export function useSupabase() {
  async function login({ email, password }: any) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data.user))
      return { data, error }
    } catch (e) {
      console.log({ e })
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
    return error ?? true
  }
  return {
    login,
    signUp,
    signOut,
  }
}
