import { WabTecAutoFilling } from './auto-filling-websites/WorkDay'
import { filteredWebsite } from './config'

export const autoFilling = (userInfo: any) => {
  if (filteredWebsite.key == 'wabtec') {
    WabTecAutoFilling(userInfo)
  }
}
