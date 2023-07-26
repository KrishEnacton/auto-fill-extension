import { LeverAutoFilling } from './websites/Lever'
import { WorkDayAutoFilling } from './websites/WorkDay'
import { filteredWebsite } from './config'
import { bambooHRAutoFilling } from './websites/BambooHR'

export const autoFilling = (userInfo: any) => {
  if (filteredWebsite.key == 'workday') {
    WorkDayAutoFilling(userInfo)
  }
  if (filteredWebsite.key == 'lever') {
    LeverAutoFilling(userInfo)
  }
  if (filteredWebsite.key == 'bambooHR') {
    bambooHRAutoFilling(userInfo)
  }
}
