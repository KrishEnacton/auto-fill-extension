import { selectorProps } from '../../global'
import { GreenHouseConfig } from './auto-filling-websites/GreenHouse/config'
import { LeverConfig } from './auto-filling-websites/Lever/config'
import { WorkDayConfig } from './auto-filling-websites/WorkDay/config'
import { iCIMSConfig } from './auto-filling-websites/iCIMS/config'

export const AutoFillingWebsites: any = [WorkDayConfig, LeverConfig, GreenHouseConfig, iCIMSConfig]

export const filteredWebsite: any = AutoFillingWebsites.find((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    return selector
  }
})
