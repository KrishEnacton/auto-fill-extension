import { toast } from 'react-toastify'
import { tabs } from '../constants'

export const notify = (message: string, type: string) => {
  if (type == 'success') {
    toast.success(message)
  }
  if (type == 'warning') {
    toast.warning(message)
  }
  if (type == 'error') {
    toast.error(message)
  }
}

export const getNextTabName = (currentName: any) => {
  const currentIndex = tabs.findIndex((tab: any) => tab.name === currentName)
  const nextIndex = (currentIndex + 1) % tabs.length
  return tabs[nextIndex].name
}

export function generateRandomString(length: number) {
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var randomString = ''

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}
