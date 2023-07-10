import { UserInfo } from '../../global'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const setUserInfo = (userParams: any): boolean => {

    const res = getUserInfo()
    console.log('called', { res, userParams })
    if (res && Object.values(res)?.length > 0) {
      console.log(Object.keys(userParams)[0])
      if (Object.keys(userParams)[0] === 'education') {
        setLocalStorage('userInfo', { ...res, education: userParams.education })
        return true
      }
      if (Object.keys(userParams)[0] === 'experience') {
        setLocalStorage('userInfo', { ...res, experience: userParams.experience })
        return true
      }
      if (Object.keys(userParams)[0] === 'skills') {
        setLocalStorage('userInfo', { ...res, skills: userParams.skills })
        return true
      }
      return false
    } else {
      setLocalStorage('userInfo', { ...userParams })
      return true
    }
  }

  // const deleteEducation = (index: number) => {
  //   const userInfo = getUserInfo()
  //   const removedIndex = userInfo.education.indexOf(index)
  //   setLocalStorage('userInfo', {
  //     ...userInfo,
  //     education: userInfo.education.splice(removedIndex, 1),
  //   })
  // }

  const getUserInfo = () => {
    return getLocalStorage('userInfo') as UserInfo
  }

  const clearUserInfo = () => {
    clearLocalStorage('userInfo')
  }

  return {
    setUserInfo,
    getUserInfo,
    clearUserInfo,
    // deleteEducation,
  }
}

export default useStorage
