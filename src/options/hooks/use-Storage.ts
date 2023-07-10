function useStorage() {
  const setUserInfo = (userParams: any) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ userInfo: userParams }, () => {
        console.log('user set')
        resolve(true)
      })
    }) as Promise<boolean>
  }

  const getUserInfo = (): Promise<boolean | any> => {
    return new Promise(function (resolve) {
      try {
        chrome.storage.local.get(['userInfo']).then((res: any) => {
          resolve(res.userInfo)
        })
      } catch (error) {
        resolve(false)
      }
    })
  }

  const clearUserInfo = () => {}
  return {
    setUserInfo,
    getUserInfo,
    clearUserInfo,
  }
}

export default useStorage
