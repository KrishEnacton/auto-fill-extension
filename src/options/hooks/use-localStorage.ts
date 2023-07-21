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

  return { setLocalStorage, getLocalStorage, clearLocalStorage }
}
