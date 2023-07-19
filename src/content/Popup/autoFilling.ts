import { WabTecAutoFilling } from './auto-filling-websites/wabtec'
import { filteredWebsite } from './config'

export const autoFilling = (userInfo: any) => {
  console.log({ userInfo }, 'user info')
  if (filteredWebsite.key == 'wabtec') {
    WabTecAutoFilling(userInfo)
  }
}
