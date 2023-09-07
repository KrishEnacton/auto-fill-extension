import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, spreadUserInfo } from '../../../../utils'
import { LeverConfig } from './config'

function getInputValue(key: string, userDetails: any): [string, unknown] | undefined {
  const inputValue = Object.entries(userDetails).find((item) => {
    if (item[0].includes(key)) {
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

function radioFieldsAutoFill(inputValue: any, value: any) {
  const InputElem = Array.from(document.querySelectorAll(LeverConfig.radioElem)).find(
    (item: any) => {
      if (new RegExp(`\\b${value}\\b`, 'i').test(item.innerText)) {
        return item
      }
    },
  )
  if (InputElem) {
    //@ts-ignore
    const radioElems = Array.from(InputElem.nextElementSibling.getElementsByTagName('input'))
    if (inputValue?.[1] == 'Yes') {
      //@ts-ignore
      radioElems[0].checked = true
    } else {
      //@ts-ignore
      radioElems[1].checked = true
    }
  }
}

// website specific auto-filling function
export const LeverAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)
  for (const [key, value] of Object.entries(LeverConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)

    //custom filling for full name
    if (key == 'full_name') {
      const InputElem = document.querySelector(`${value}`)
      if (UserDetails?.firstName && UserDetails.lastName) {
        normalFieldsAutoFill(UserDetails.firstName + ' ' + UserDetails.lastName, InputElem)
      }
      continue
    }

    // for normal radio/checkbox
    if (key == 'is_authorized_in_us' || key == 'is_required_visa') {
      radioFieldsAutoFill(inputValue, value)
      continue
    }

    // for normal text fields
    for (const item of Array.from(document.querySelectorAll(LeverConfig.commonSelector))) {
      //@ts-ignore
      const text = item.innerText

      if (new RegExp(`\\b${value}\\b`, 'i').test(text)) {
        const inputElem = item.querySelector(`input`)
        if (inputValue?.[0] == 'ethnicity' || inputValue?.[0] == 'city') {
          normalFieldsAutoFill(inputValue?.[1].name, inputElem)
          continue
        }
        normalFieldsAutoFill(inputValue?.[1], inputElem)
        continue
      }
    }

    // for normal select
    for (const item of Array.from(document.querySelectorAll(LeverConfig.commonSelector))) {
      const selectElem: any = item.querySelector('select')

      let value = typeof inputValue?.[1] == 'string' ? inputValue?.[1] : inputValue?.[1].name
      if (value) {
        if (selectElem) {
          console.log(inputValue)
          Array.from(selectElem?.options).forEach((option: any) => {
            if (inputValue[0] == 'is_disabled') console.log(option.value, new RegExp(`^${value}`))
            if (new RegExp(`^${value}`, 'i').test(option.value)) {
              selectElem.value = option.value
            }
          })
        }
      }
    }
    continue
  }
}
