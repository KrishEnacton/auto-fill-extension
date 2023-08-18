import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, spreadUserInfo } from '../../../../utils'
import { BambooHRConfig } from './config'

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
export const bambooHRAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)
  //@ts-ignore
  const jobContainer = document.querySelector('.jss-e73')
  if (jobContainer?.innerHTML == 'Apply for This Job') {
    //@ts-ignore
    jobContainer.click()
  }
  for (const [key, value] of Object.entries(BambooHRConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)

    // for normal text fields
    for (const item of Array.from(document.querySelectorAll(BambooHRConfig.commonSelector))) {
      //@ts-ignore
      const text = item.innerText
      if (new RegExp(`\\b${value}\\b`, 'i').test(text)) {
        const inputElem = item.querySelector(`input`)
        if (inputValue?.[0] == 'city') {
          normalFieldsAutoFill(inputValue?.[1].name, inputElem)
          continue
        } else if (inputValue?.[0] == 'countryCode') {
          const selectBox = document.querySelector(
            `div[class="fab-SelectToggle fab-SelectToggle--clearable fab-SelectToggle--width100 fab-SelectToggle--sizeMedium"]`,
          )
          setTimeout(() => {
            //@ts-ignore
            const response = dispatchEventOnElement(selectBox, 'click')
            setTimeout(() => {
              const optionsDiv = Array.from(document.querySelectorAll(`div[role="menuitem"]`))
              const selectedOption = optionsDiv.find(
                (elem: any) => elem.innerText === inputValue[1].name,
              )
              //@ts-ignore
              selectedOption.click()
            }, 100)
          }, 100)
        }
        normalFieldsAutoFill(inputValue?.[1], inputElem)
        continue
      }
    }

    continue
  }
}
