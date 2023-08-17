import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, spreadUserInfo } from '../../../../utils'
import { GreenHouseConfig } from './config'

function getInputValue(key: string, userDetails: any): [string, unknown] | undefined {
  const inputValue = Object.entries(userDetails).find((item) => {
    if (item[0] == key || new RegExp(`${item[0]}\\b`).test(key)) {
      return item
    }
  })
  return inputValue
}

function normalFieldsAutoFill(inputValue: string, InputElem: Element | null) {
  if (inputValue && InputElem) {
    //@ts-ignore
    InputElem.value = inputValue
    dispatchEventOnElement(InputElem, 'change')
  }
}

// website specific auto-filling function
export const greenHouseAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)
  //@ts-ignore
  const jobContainer = document.querySelector('.jss-e73')
  if (jobContainer?.innerHTML == 'Apply for This Job') {
    //@ts-ignore
    jobContainer.click()
  }
  for (const [key, value] of Object.entries(GreenHouseConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)
    // for normal text fields
    for (const item of Array.from(document.querySelectorAll(GreenHouseConfig.commonSelector))) {
      //@ts-ignore
      const text = item.innerText
      if (new RegExp(`\\b${value}\\b`, 'i').test(text)) {
        const inputElem = item.querySelector(`input[type='text']`)
        normalFieldsAutoFill(inputValue?.[1], inputElem)
        continue
      }
    }

    continue
  }
}
