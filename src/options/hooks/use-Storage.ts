import { useEffect } from 'react'
import { UserInfo } from '../../global'
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
    console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggg')
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

  const updateUserInfo = (updatedArray: any) => {
    console.log('vvv')
    const res: any = getUserInfo()

    // setLocalStorage('userInfo', {
    //   ...res,
    //   experience: newArray,
    // })
    console.log({ result: replaceFields(res.education, updatedArray) })
  }

  const getUserInfo = () => {
    return getLocalStorage('userInfo') as UserInfo
  }

  const clearUserInfo = () => {
    clearLocalStorage('userInfo')
  }
  type FFObject = {
    school_name: string
    id: string
    major: string
    degree: string
    GPA: string
    start_month: string
    start_year: string
    end_month: string
    end_year: string
  }

  type FFDObject = {
    id: string
    major?: string
    school_name?: string
    GPA?: string
  }

  function replaceFields(ff: FFObject[], ffd: FFDObject[]): FFObject[] {
    const ffdMap: Record<string, FFDObject> = {}
    ffd.forEach((obj) => {
      ffdMap[obj.id] = obj
    })

    ff.forEach((obj) => {
      const id = obj.id

      if (ffdMap.hasOwnProperty(id)) {
        const ffdObj = ffdMap[id]

        Object.keys(ffdObj).forEach((key: any) => {
          if (ffdObj[key] !== undefined) {
            obj[key] = ffdObj[key]
          }
        })
      }
    })

    return ff
  }

  return {
    setUserInfo,
    getUserInfo,
    clearUserInfo,
    updateUserInfo,
  }
}

export default useStorage
const ff = [
  {
    school_name: 'aa',
    id: 'blbzf',
    major: 'Aerospace Engineering',
    degree: 'Masters',
    GPA: '4',
    start_month: 'March',
    start_year: '1931',
    end_month: 'February',
    end_year: '1932',
  },
  {
    school_name: 'bbb',
    id: 'jrpzq',
    major: 'Anthropology',
    degree: 'PhD',
    GPA: '5',
    start_month: 'March',
    start_year: '1933',
    end_month: 'February',
    end_year: '1934',
  },
  {
    school_name: 'ccc',
    id: 'ttwzq',
    major: 'Applied Mathematics',
    degree: 'PhD',
    GPA: '8',
    start_month: 'March',
    start_year: '1932',
    end_month: 'March',
    end_year: '1943',
  },
]

const ffd = [
  {
    id: 'ttwzq',
    major: 'Art',
    school_name: ' sdfsdf',
    GPA: '6',
  },
  {
    id: 'jrpzq',
    GPA: '8',
    school_name: 'madhu',
  },
]
