import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '../../atoms/index'
import { useRecoilState } from 'recoil'

export const withAuth = (Component: any) => {
  function UpdatedComponent() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom)
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user?.id) {
        navigate('/')
      }
    }, [user])

    return <Component />
  }
  return UpdatedComponent
}
