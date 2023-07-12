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
