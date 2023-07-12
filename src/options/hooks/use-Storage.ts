import { UserInfo } from '../../global'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const setUserInfo = (userParams: any): boolean => {
    const res = getUserInfo()
    if (res && Object.values(res)?.length > 0) {
      console.log(Object.keys(userParams)[0])
      if (Object.keys(userParams)[0] === 'basicInfo') {
        setLocalStorage('userInfo', { ...res, basicInfo: userParams.basicInfo })
        return true
      }
      if (Object.keys(userParams)[0] === 'education') {
        setLocalStorage('userInfo', { ...res, education: userParams.education })
        return true
      }
      if (Object.keys(userParams)[0] === 'experience') {
        const experience = userParams.experience
        setLocalStorage('userInfo', {
          ...res,
          experience: experience.is_working_currently
            ? { ...experience, end_month: '', end_year: '' }
            : experience,
        })
        return true
      }
      if (Object.keys(userParams)[0] === 'authorization') {
        setLocalStorage('userInfo', { ...res, authorization: userParams.authorization })
        return true
      }
      if (Object.keys(userParams)[0] === 'ethnicity') {
        setLocalStorage('userInfo', { ...res, ethnicity: userParams.ethnicity })
        return true
      }
      if (Object.keys(userParams)[0] === 'skills') {
        setLocalStorage('userInfo', { ...res, skills: userParams.skills })
        return true
      }
      if (Object.keys(userParams)[0] === 'isFirstJob') {
        setLocalStorage('userInfo', { ...res, is_first_job: userParams.isFirstJob })
        return true
      }
      if (Object.keys(userParams)[0] === 'socials') {
        setLocalStorage('userInfo', { ...res, socials: userParams.socials })
        return true
      }
      return false
    } else {
      setLocalStorage('userInfo', { ...userParams })
      return true
    }
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
  }
}

export default useStorage
