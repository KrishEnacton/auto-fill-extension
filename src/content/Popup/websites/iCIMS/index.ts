import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, spreadUserInfo } from '../../../../utils'
import { iCIMSConfig } from './config'

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

function radioFieldsAutoFill(inputValue: any, value: any) {
  const InputElem = Array.from(document.querySelectorAll(iCIMSConfig.addMoreButton)).find(
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
export const iCIMSAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)
  //@ts-ignore
  const iframeParent = document.querySelector(iCIMSConfig.iframeSelector).contentDocument

  const formEmail = iframeParent?.querySelector(iCIMSConfig.formEmail)
  if (formEmail) {
    //@ts-ignore
    formEmail.value = UserDetails.email
    dispatchEventOnElement(formEmail, 'change')
  }

  const acceptCheckbox = iframeParent?.querySelector(iCIMSConfig.acceptCheckbox)
  console.log({acceptCheckbox})
  if (acceptCheckbox) acceptCheckbox?.click()

  setTimeout(() => {
    for (const [key, value] of Object.entries(iCIMSConfig.selectors)) {
      const inputValue: any = getInputValue(key, UserDetails)

      // for normal text fields
      for (const item of Array.from(
        iframeParent.querySelectorAll(iCIMSConfig.commonSelector),
      ) as any) {
        console.log({ item })
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
      for (const item of Array.from(document.querySelectorAll(iCIMSConfig.commonSelector))) {
        const selectElem: any = item.querySelector('select')

        let value = typeof inputValue?.[1] == 'string' ? inputValue?.[1] : inputValue?.[1].name
        if (value) {
          if (inputValue[0] == 'ethnicity') {
            value = value.includes('/') ? value.split('/')[0] : value
            value = value.includes(' ') ? value.split(' ').join('|') : value
          }
          if (selectElem) {
            Array.from(selectElem?.options).forEach((option: any) => {
              if (new RegExp(`\\b${value}`).test(option.innerText)) {
                selectElem.value = option.value
              }
            })
          }
        }
      }
      continue
    }
  }, 1000)
}
