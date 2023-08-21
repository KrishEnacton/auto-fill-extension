import { LeverAutoFilling } from './websites/Lever'
import { WorkDayAutoFilling } from './websites/WorkDay'
import { JobViteAutoFilling } from './websites/JobVite'
import { filteredWebsite } from './config'
import { bambooHRAutoFilling } from './websites/BambooHR'
import { greenHouseAutoFilling } from './websites/GreenHouse'

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
  if (filteredWebsite.key == 'jobvite') {
    JobViteAutoFilling(userInfo)
  }
  if (filteredWebsite.key == 'greenhouse') {
    greenHouseAutoFilling(userInfo)
  }
}
