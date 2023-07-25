import { LeverAutoFilling } from './websites/Lever'
import { WabTecAutoFilling } from './websites/WorkDay'
import { filteredWebsite } from './config'

export const autoFilling = (userInfo: any) => {
  if (filteredWebsite.key == 'workday') {
    WabTecAutoFilling(userInfo)
  }
  if (filteredWebsite.key == 'lever') {
    LeverAutoFilling(userInfo)
  }
}
