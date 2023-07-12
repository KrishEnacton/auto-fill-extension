import { toast } from 'react-toastify'

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
