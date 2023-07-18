import { WabTecAutoFilling } from './auto-filling-websites/wabtec/autofill'
import { filteredWebsite } from './config'

export const autoFilling = (userInfo: any) => {
  console.log({ userInfo })
  if (filteredWebsite.key == 'wabtec') {
    WabTecAutoFilling(userInfo)
  }
}
