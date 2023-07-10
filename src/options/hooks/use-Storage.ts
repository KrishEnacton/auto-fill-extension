import { EducationProps, UserInfo } from '../../global'
import { useLocalStorage } from './use-localStorage'

function useStorage() {
  const { clearLocalStorage, getLocalStorage, setLocalStorage } = useLocalStorage()
  const setUserInfo = (userParams: any) => {
    return new Promise((resolve) => {
      const res = getUserInfo()
      console.log({ res, userParams })
      if (res && Object.values(res)?.length > 0) {
        setLocalStorage('userInfo', { ...userParams, ...res })
        resolve(true)
      } else {
        setLocalStorage('userInfo', { ...userParams })
        resolve(true)
      }
    }) as Promise<boolean>
  }

  // const setEducation = (education: EducationProps) => {
  //   return new Promise((resolve) => {
  //     getUserInfo().then((res: any) => {
  //       console.log({ res })
  //       if (res && Object.values(res)?.length > 0) {
  //         const responseEducation: any[] =
  //           (typeof res?.education === 'object' && res?.education) ?? []
  //         console.log({ responseEducation })
  //         chrome.storage.local.set(
  //           { userInfo: { ...res, education: responseEducation.push(education) } },
  //           () => {
  //             console.log('info added')
  //             resolve(true)
  //           },
  //         )
  //       } else {
  //         chrome.storage.local.set({ userInfo: { education: [education] } }, () => {
  //           console.log('user set')
  //           resolve(true)
  //         })
  //       }
  //     })
  //   }) as Promise<boolean>
  // }

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
    // setEducation,
    getEducation,
    // deleteEducation,
  }
}

export default useStorage
