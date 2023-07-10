function useStorage() {
  const setUserInfo = (name: any, userParams: any) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ name: userParams }, () => {
        resolve(true)
      })
    }) as Promise<boolean>
  }

  const getUserInfo = (name: any): Promise<boolean | any> => {
    return new Promise(function (resolve) {
      try {
        chrome.storage.local.get([`${name}`]).then((res: any) => {
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
