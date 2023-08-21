import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, sleep, spreadUserInfo } from '../../../../utils'
import { JobViteConfig } from './config'

function getInputValue(key: string, userDetails: any): [string, unknown] | undefined {
  const inputValue = Object.entries(userDetails).find((item) => {
    if (item[0] === key) {
      return item
    }
  })
  return inputValue
}

function normalFieldsAutoFill(inputValue: string | number, InputElem: Element) {
  if (inputValue && InputElem) {
    //@ts-ignore
    InputElem.value = inputValue
    dispatchEventOnElement(InputElem, 'change')
  }
}

function radioFieldsAutoFill(InputElem: Element) {
  const IElem = InputElem.parentElement?.querySelector('i')
  IElem?.click()
}

// website specific auto-filling function
export const JobViteAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)

  for (const [key, value] of Object.entries(JobViteConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)
    // for normal text fields
    for (const item of Array.from(document.querySelectorAll(JobViteConfig.commonSelector))) {
      const text =
        //@ts-ignore
        item.parentElement.innerText == ''
          ? //@ts-ignore
            item.parentElement?.parentElement.innerText
          : //@ts-ignore
            item.parentElement.innerText

      const _inputValue =
        typeof inputValue?.[1] === 'object' ? inputValue?.[1].name : inputValue?.[1]
      if (text && new RegExp(`\\b${value}\\b|\\b${value}`, 'ig').test(text)) {
        normalFieldsAutoFill(_inputValue, item)
      }
      if (text && new RegExp(`\\b${_inputValue}`).test(text)) {
        radioFieldsAutoFill(item)
      }
    }
  }
}
