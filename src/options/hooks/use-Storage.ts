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

    if (checkMajorExistence(res.education, updatedArray) == 'already present') {
      notify('Education with this major is already exists', 'error')
    } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
      notify('Please enter different majors for different education', 'error')
    } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
      setLocalStorage('userInfo', {
        ...res,
        education: replaceFields(res.education, updatedArray),
      })
      notify('Data Saved', 'success')
    }
  }

  const updateExpData = (updatedArray: any) => {
    const res: any = getUserInfo()
    if (checkDuplicates(res.experience, updatedArray) == 'already present') {
      notify('Experience with this position is already exists', 'error')
    } else if (checkMajorExistence(res.education, updatedArray) == 'duplicate data') {
      notify('Please enter different positions for different experience', 'error')
    } else if (checkMajorExistence(res.education, updatedArray) == 'success') {
      setLocalStorage('userInfo', {
        ...res,
        experience: replaceFields(res.experience, updatedArray),
      })
      notify('Data Saved', 'success')
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
    updateEducationData,
    updateExpData,
  }
}

export default useStorage

function checkMajorExistence(res: any, updatedData: any) {
  const majorsInUpdatedData = new Set()

  for (const item of updatedData) {
    const { id, major } = item

    if (majorsInUpdatedData.has(major)) {
      return 'duplicate data'
    }

    majorsInUpdatedData.add(major)

    const matchingItem = res.find((item: any) => item.major === major)
    if (matchingItem) {
      return 'already present'
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

const res = [
  {
    company_name: 'enaedfd dfcton',
    id: 'bdean',
    position_title: 'intern',
    experience_type: 'Part time',
    location: {
      name: 'Remote',
    },
    start_month: 'February',
    start_year: '1932',
    end_month: 'February',
    end_year: '1936',
    is_working_currently: false,
    description: 'dfgdfg',
  },
  {
    company_name: 'luxuria',
    id: 'ejbbf',
    position_title: 'mobile developer',
    experience_type: 'Internship',
    location: {
      name: 'Surat',
      latitude: 21.17,
      longitude: 72.83,
      country: 'IN',
      population: 5807000,
      is_capital: false,
    },
    start_month: 'March',
    start_year: '1932',
    end_month: 'April',
    end_year: '1934',
    is_working_currently: false,
    description: ' sdsdg',
  },
  {
    company_name: 'luxuria',
    id: 'tsfzb',
    position_title: 'mobi dsfdf',
    experience_type: 'Internship',
    location: {
      name: 'Remote',
    },
    start_month: 'February',
    start_year: '1932',
    end_month: 'March',
    end_year: '1934',
    description: 'dsgdfg',
  },
]

const updatedData = [
  {
    id: 'bdean',
    company_name: 'enacton',
    position_title: 'full stack intern',
  },
  {
    id: 'ccccc',
    company_name: 'enacton',
    position_title: 'full stack intern',
  },
]
