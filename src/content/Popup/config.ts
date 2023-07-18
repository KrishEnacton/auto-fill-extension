import { selectorProps } from '../../global'
import { WabTecConfig } from './auto-filling-websites/wabtec/config'

export const AutoFillingWebsites: any = [WabTecConfig]

export const filteredWebsite: any = AutoFillingWebsites.find((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    return selector
  }
})
