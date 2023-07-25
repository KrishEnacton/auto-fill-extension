import { UserInfo } from '../../../../global'
import { spreadUserInfo } from '../../../../utils'
import { LeverConfig } from './config'

function getInputValue(key: string, userDetails: any): [string, unknown] | undefined {
  const inputValue = Object.entries(userDetails).find((item) => {
    if (item[0] == key || new RegExp(`\\b${item[0]}\\b`).test(key)) return item
  })
  return inputValue
}

function normalFieldsAutoFill(inputValue: string, InputElem: Element | null) {
  if (inputValue && InputElem) {
    //@ts-ignore
    InputElem.value = inputValue
    InputElem?.dispatchEvent(new Event('change', { bubbles: true }))
  }
}

function radioFieldsAutoFill(inputValue: any, value: any) {
  const InputElem = Array.from(document.querySelectorAll(LeverConfig.radioElem)).find((item) => {
    const inputElem: any = item.querySelector('div')
    if (new RegExp(`\\b${value}\\b`, 'i').test(inputElem.innerText)) {
      return item
    }
  })
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

  // for important fields
  for (const [key, value] of Object.entries(LeverConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)

    const InputElem = document.querySelector(`${value}`)
    if (key == 'full_name') {
      if (UserDetails?.firstName && UserDetails.lastName) {
        normalFieldsAutoFill(UserDetails.firstName + ' ' + UserDetails.lastName, InputElem)
      }
      continue
    }

    normalFieldsAutoFill(inputValue?.[1], InputElem)
    continue
  }

  // for additional fields
  for (const [key, value] of Object.entries(LeverConfig.additional)) {
    const inputValue: any = getInputValue(key, UserDetails)

    if (key == 'is_authorized_in_us' || key == 'is_required_visa') {
      radioFieldsAutoFill(inputValue, value)
    }

    for (const item of Array.from(
      document.querySelectorAll(LeverConfig.additionalParentSelector),
    )) {
      //@ts-ignore
      const text = item.innerText
      if (text && text == value) {
        const inputElem = item.querySelector(`div.application-field input`)
        if (inputValue?.[0] == 'ethnicity' || inputValue?.[0] == 'city') {
          normalFieldsAutoFill(inputValue?.[1].name, inputElem)
          continue
        }
        normalFieldsAutoFill(inputValue?.[1], inputElem)
      }
    }
    continue
  }
}
