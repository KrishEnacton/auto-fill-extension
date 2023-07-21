import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { educationListAtom, experienceListAtom } from '../../atoms'
import { UserInfo } from '../../global'
import { getNextTabName, notify, replaceFields } from '../../utils'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)

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
      setLocalStorage('userInfo', { ...userParams })
      return true
    }
  }

  const updateEducationList = (updatedArray: any, setUpdatedArray: any, next = false) => {
    const res: any = getUserInfo()
    if (updatedArray.length > 0) {
      if (checkMajorExistence(res.education, updatedArray) == 'already present') {
        notify('Education with this major & degree already exists', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
        notify('Please enter different majors & degree for different education', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
        setLocalStorage('userInfo', {
          ...res,
          education: replaceFields(res.education, updatedArray),
        })
        setEducationList(replaceFields(res.education, updatedArray))
        notify('Data Saved', 'success')
        setUpdatedArray([])
        return true
      }
    }
    return true
  }

  const updateExpList = (updatedArray: any, setUpdatedArray: any, next = false) => {
    const res: any = getUserInfo()
    if (updatedArray.length > 0) {
      if (checkDuplicates(res.experience, updatedArray) == 'already present') {
        notify('Experience with this position is already exists', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
        notify('Please enter different positions for different experience', 'error')
        return false
      } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
        setLocalStorage('userInfo', {
          ...res,
          experience: replaceFields(res.experience, updatedArray),
        })
        setExperiences(replaceFields(res.experience, updatedArray))
        notify('Data Saved', 'success')
        setUpdatedArray([])
        return true
      }
    }
    return true
  }

  const getUserInfo = () => {
    return getLocalStorage('userInfo') as UserInfo
  }

  const getUserDetails = () => {
    return getLocalStorage('user')
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
    getUserDetails,
  }
}

export default useStorage

function checkMajorExistence(res: any, updatedData: any) {
  const majorsInUpdatedData: any = []
  for (const item of updatedData) {
    const { major, degree } = item
    if (major && degree) {
      if (
        majorsInUpdatedData.some((obj: any) => {
          return obj.major === major && obj.degree === degree
        })
      ) {
        return 'duplicate data'
      }
      majorsInUpdatedData.push({ major, degree })
      const matchingItem = res.find((item: any) => item.major === major && item.degree === degree)
      if (matchingItem) {
        return 'already present'
      }
    }
  }

  return 'success'
}

function checkDuplicates(res: any, updatedData: any) {
  // Check for duplicates in updatedData
  const updatedDataDuplicates = updatedData.filter((item: any, index: any, arr: any) => {
    return (
      arr.findIndex(
        (obj: any) =>
          obj.company_name === item.company_name && obj.position_title === item.position_title,
      ) !== index
    )
  })

  // Check for matches between res and updatedData
  const alreadyPresent = res.some((resItem: any) => {
    return updatedData.some(
      (updatedItem: any) =>
        resItem.company_name === updatedItem.company_name &&
        resItem.position_title === updatedItem.position_title,
    )
  })

  // Return the appropriate result
  if (updatedDataDuplicates.length > 0) {
    return 'duplicate'
  } else if (alreadyPresent) {
    return 'already present'
  } else {
    return 'success'
  }
}
