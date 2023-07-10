// import { UserInfo } from '../../global'

function useStorage() {
  const setUserInfo = (userParams: any) => {
    return new Promise((resolve) => {
      getUserInfo().then((res: any) => {
        if (res && Object.values(res)?.length > 0) {
          let body: any
          if (Object.keys(userParams)[0] === 'education') {
            body = { ...res, education: res?.education?.push(userParams) ?? Array.from(userParams) }
          } else if (Object.keys(userParams)[0] === 'experience') {
            body = {
              ...res,
              experience: res?.experience?.push(userParams) ?? Array.from(userParams),
            }
          } else {
            body = { ...userParams, ...res }
          }
          chrome.storage.local.set({ userInfo: body }, () => {
            console.log('info added')
            resolve(true)
          })
        } else {
          chrome.storage.local.set({ userInfo: userParams }, () => {
            console.log('user set')
            resolve(true)
          })
        }
      })
    }) as Promise<boolean>
  }

  const getUserInfo = (): Promise<boolean | any> => {
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
  }
}

export default useStorage
