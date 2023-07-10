import { toast } from 'react-toastify'

export const notify = (message: string, type: string) => {
  if (message === 'success') {
    toast.success(message)
  }
  if (message === 'warning') {
    toast.success(message)
  }
  if (message === 'error') {
    toast.success(message)
  }
}
