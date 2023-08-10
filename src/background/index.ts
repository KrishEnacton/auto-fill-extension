import { useLocalStorage } from '../options/hooks/use-localStorage'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // const { getLocalStorage } = useLocalStorage()
  // console.log(request)
  // if (request.action === 'REQUEST_USER_INFO') {
  //   const userInfo = getLocalStorage('users')
  //   sendResponse(userInfo)
  // }
})

export {}
