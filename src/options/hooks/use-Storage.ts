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
    const [key, value]: [string, any] = Object.entries(userParams)[0]
    if (res && Object.values(res)?.length > 0) {
      if (key == 'experience') {
        const newArray = [...value]

        if (value.length > 0 && value[value.length - 1].is_working_currently) {
          newArray[value.length - 1] = {
            ...value[value.length - 1],
            end_month: '',
            end_year: '',
          }
          setLocalStorage('userInfo', {
            ...res,
            experience: newArray,
          })
          return true
        }
      }
      setLocalStorage('userInfo', { ...res, [key]: value })
      return true
    } else {
      if (key == 'experience') {
        const newArray = [...value]

        if (value.length > 0 && value[value.length - 1].is_working_currently) {
          newArray[value.length - 1] = {
            ...value[value.length - 1],
            end_month: '',
            end_year: '',
          }
          setLocalStorage('userInfo', {
            ...res,
            experience: newArray,
          })
          return true
        }
        setLocalStorage('userInfo', { ...userParams })
        return true
      }
      return false
    }
  }

  const updateEducationList = (updatedArray: any) => {
    const res: any = getUserInfo()

    setLocalStorage('userInfo', {
      ...res,
      education: replaceFields(res.education, updatedArray),
    })
    notify('Data Saved', 'success')
  }

  const updateExpList = (updatedArray: any) => {
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
    updateEducationList,
    updateExpList,
  }
}

export default useStorage
