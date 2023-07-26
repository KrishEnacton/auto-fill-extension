import { LeverAutoFilling } from './websites/Lever'
import { WorkDayAutoFilling } from './websites/WorkDay'
import { filteredWebsite } from './config'

export const autoFilling = (userInfo: any) => {
  if (filteredWebsite.key == 'workday') {
    WorkDayAutoFilling(userInfo)
  }
  if (filteredWebsite.key == 'lever') {
    LeverAutoFilling(userInfo)
  }
}
