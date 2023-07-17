import { selectorProps } from '../../global'
import { WabTecAutoFilling } from './auto-filling-websites/wabtec'
import { ScrapperWebsites } from './config'

export const autoFilling = (userInfo: any) => {
  const filteredSelector: any = ScrapperWebsites.find((selector: selectorProps) => {
    if (selector.regex.test(window.location.href)) {
      return selector
    }
  })
  if (filteredSelector.key == 'wabtec') {
    WabTecAutoFilling(userInfo)
  }
}
