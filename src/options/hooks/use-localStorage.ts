export const useLocalStorage = () => {
  const setLocalStorage = (name: string, value: any) => {
    window.localStorage.setItem(name, JSON.stringify(value))
    return true
  }
  const getLocalStorage = (name: string) => {
    return JSON.parse(window.localStorage.getItem(name) || 'null')
  }
  const clearLocalStorage = (name: string) => {
    return window.localStorage.removeItem(name)
  }

  const setChromeStorage = (name: string, value: any) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve(true)
      })
    })
  }
  const getChromeStorage = (name: string) => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (res) => {
        resolve(res)
      })
    })
  }

  return { setLocalStorage, getLocalStorage, clearLocalStorage, getChromeStorage, setChromeStorage }
}
