import { useEffect } from 'react'
import { UserInfo } from '../../global'
import { notify, replaceFields } from '../../utils'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      const userInfo = getUserInfo()
      if (req.from == 'content') {
        sendResponse(userInfo)
      }
    })
    return () => {}
  }, [])

  const setUserInfo = (userParams: any): boolean => {
    const res = getUserInfo()
    if (res && Object.values(res)?.length > 0) {
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
        const newArray = [...experience]

        if (experience.length > 0 && experience[experience.length - 1].is_working_currently) {
          newArray[experience.length - 1] = {
            ...experience[experience.length - 1],
            end_month: '',
            end_year: '',
          }
        }

        setLocalStorage('userInfo', {
          ...res,
          experience: newArray,
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
      if (Object.keys(userParams)[0] === 'experience') {
        const experience = userParams.experience
        const newArray = [...experience]

        if (experience.length > 0 && experience[experience.length - 1].is_working_currently) {
          newArray[experience.length - 1] = {
            ...experience[experience.length - 1],
            end_month: '',
            end_year: '',
          }
        }

        setLocalStorage('userInfo', {
          ...res,
          experience: newArray,
        })

        return true
      } else {
        setLocalStorage('userInfo', { ...userParams })
        return true
      }
    }
  }

  const updateEducationData = (updatedArray: any) => {
    const res: any = getUserInfo()

    setLocalStorage('userInfo', {
      ...res,
      education: replaceFields(res.education, updatedArray),
    })
    notify('Data Saved', 'success')
  }

  const updateExpData = (updatedArray: any) => {
    const res: any = getUserInfo()

    setLocalStorage('userInfo', {
      ...res,
      experience: replaceFields(res.experience, updatedArray),
    })
    notify('Data Saved', 'success')
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
    updateEducationData,
    updateExpData,
  }
}

export default useStorage
