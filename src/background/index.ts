import { useLocalStorage } from '../options/hooks/use-localStorage'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { getChromeStorage } = useLocalStorage()
  if (request.action === 'REQUEST_USER_INFO') {
    getChromeStorage('users').then((res: any) => {
      const user = res.users.filter((obj: any) => Object.values(obj).length > 0)
      sendResponse(Object.values(user[0])[0])
    })
  }
  return true
})

export {}
