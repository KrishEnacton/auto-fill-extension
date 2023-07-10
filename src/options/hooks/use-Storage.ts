import { EducationProps, UserInfo } from '../../global'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const setUserInfo = (userParams: any) => {
    return new Promise((resolve) => {
      getUserInfo().then((res: any) => {
        if (res && Object.values(res)?.length > 0) {
          setLocalStorage('userInfo', { userInfo: { ...userParams, ...res } })
          resolve(true)
        } else {
          setLocalStorage('userInfo', { userInfo: userParams })
          resolve(true)
        }
      })
    }) as Promise<boolean>
  }

  const setEducation = (education: EducationProps) => {
    return new Promise((resolve) => {
      getUserInfo().then((res: any) => {
        console.log({ res })
        if (res && Object.values(res)?.length > 0) {
          const responseEducation: any[] =
            (typeof res?.education === 'object' && res?.education) ?? []
          console.log({ responseEducation })
          chrome.storage.local.set(
            { userInfo: { ...res, education: responseEducation.push(education) } },
            () => {
              console.log('info added')
              resolve(true)
            },
          )
        } else {
          chrome.storage.local.set({ userInfo: { education: [education] } }, () => {
            console.log('user set')
            resolve(true)
          })
        }
      })
    }) as Promise<boolean>
  }

  const getUserInfo = (): Promise<boolean | UserInfo> => {
    return new Promise(function (resolve) {
      try {
        chrome.storage.local.get([`userInfo`]).then((res: any) => {
          resolve(res.userInfo)
        })
      } catch (error) {
        resolve(false)
      }
    })
  }

  const clearUserInfo = () => {
    return new Promise(function (resolve) {
      chrome.storage.local.clear().then(() => {
        resolve(true)
      })
    })
  }

  return {
    setUserInfo,
    getUserInfo,
    clearUserInfo,
    setEducation,
  }
}

export default useStorage
