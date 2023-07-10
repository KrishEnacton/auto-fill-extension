import { toast } from 'react-toastify'

export const notify = (message: string, type: string) => {
  if (type === 'success') {
    toast.success(message)
  }
  if (type === 'warning') {
    toast.success(message)
  }
  if (type === 'error') {
    toast.success(message)
  }
}
