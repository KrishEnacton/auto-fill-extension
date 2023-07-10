import { UserInfo } from '../../global'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const setUserInfo = (userParams: any): boolean => {
    
      const res = getUserInfo()
      console.log('called')
      if (res && Object.values(res)?.length > 0) {
        setLocalStorage('userInfo', { ...userParams, ...res })
        console.log(true)
        return true
      } else {
        setLocalStorage('userInfo', { ...userParams })
        return true
      }
  }

  const setEducation = (education: any) => {
    return new Promise((resolve) => {
      const res = getUserInfo()
      if (res && Object.values(res)?.length > 0) {
        setLocalStorage('userInfo', { ...res, education })
        resolve(true)
      } else {
        setLocalStorage('userInfo', { ...res, education: [education] })
        resolve(true)
      }
    }) as Promise<boolean>
  }

  // const deleteEducation = (index: number) => {
  //   const userInfo = getUserInfo()
  //   const removedIndex = userInfo.education.indexOf(index)
  //   setLocalStorage('userInfo', {
  //     ...userInfo,
  //     education: userInfo.education.splice(removedIndex, 1),
  //   })
  // }

  const getEducation = () => {
    const result = getUserInfo()
    return result.education
  }

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
    setEducation,
    getEducation,
    // deleteEducation,
  }
}

export default useStorage
