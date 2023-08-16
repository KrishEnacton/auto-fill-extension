import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, sleep, spreadUserInfo } from '../../../../utils'
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

function ExprienceAutoFill(iframeParent: any, UserDetails: any) {
  const experience: any = getInputValue('experience', UserDetails)

  const experienceList = experience?.[1]

  for (const i in experienceList) {
    for (const [key, value] of Object.entries(iCIMSConfig.selectors)) {
      iframeParent
        .querySelector(`div[class*="rcf3211-${Number(i) + 1}-"]`)
        .querySelectorAll('input,textarea')
        .forEach((item: any) => {
          if (item.type == 'hidden') return

          console.log(item)
          const text =
            item.parentElement.firstChild.innerText !== ''
              ? item.parentElement.firstChild.innerText
              : item.parentElement.previousElementSibling.innerText

          if (text != null) {
            console.log({ text })
            const result: any = Object.entries(iCIMSConfig.selectors).find((item) => {
              if (new RegExp(`\\b${item[1]}`).test(text)) return item
            })
            const inputValue: any = getInputValue(result?.[0], experienceList[i])

            if (text != null && new RegExp(`\\b${value}`, 'i').test(text)) {
              normalFieldsAutoFill(inputValue?.[1], item)
            }
          }
        })
      // iframeParent
      //   .querySelector(`div[class*="rcf3211-${Number(i) + 1}-"]`)
      //   .querySelectorAll('select')
      //   .forEach((item: any) => {
      //     const inputValue: any = getInputValue(key, UserDetails)
      //     const text = item.previousElementSibling.innerText
      //     if (text != null && new RegExp(`\\b${value}`, 'i').test(text)) {
      //       console.log('check')
      //     }
      //   })
    }
  }
}

function educationAutoFill(iframeParent: any, UserDetails: any) {
  for (const [key, value] of Object.entries(iCIMSConfig.selectors)) {
    iframeParent
      .querySelector(iCIMSConfig.education)
      .querySelectorAll('select')
      .forEach((item: any) => {
        const inputValue: any = getInputValue(key, UserDetails)
        const text = item.previousElementSibling.innerText
        if (item !== null) {
          const parentElem = item.parentElement
          const prevLabelElem = parentElem.querySelector('label')
          if (
            prevLabelElem?.innerText != null &&
            new RegExp(`\\b${value}`).test(prevLabelElem.innerText)
          ) {
            const dropdownElem = parentElem.querySelector(iCIMSConfig.dropdownSelector)
            if (dropdownElem != null) {
              dropdownElem.classList.remove('dropdown-invisible')
              dropdownElem.ariaExpanded = 'true'
              let value =
                typeof inputValue?.[1] == 'string' ? inputValue?.[1] : inputValue?.[1].name
              if (value) {
                if (inputValue[0] == 'ethnicity') {
                  value = value.includes('/') ? value.split('/') : value
                  value = value.includes(' ') ? value.split(' ').join('|') : value
                }
                Array.from(parentElem.querySelectorAll('ul > li')).forEach((li: any) => {
                  if (new RegExp(`\\b${value}`).test(li.innerText)) {
                    li.click()
                  }
                })
              }
              dropdownElem.classList.add('dropdown-invisible')
              dropdownElem.ariaExpanded = 'false'
            }
          }
        }
      })
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
  if (acceptCheckbox) acceptCheckbox?.click()

  setTimeout(() => {
    for (const [key, value] of Object.entries(iCIMSConfig.selectors)) {
      const inputValue: any = getInputValue(key, UserDetails)

      // for normal text fields
      for (const item of Array.from(
        iframeParent.querySelectorAll(iCIMSConfig.commonSelector),
      ) as any) {
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

      // for select dropdown
      for (const item of Array.from(iframeParent.querySelectorAll(iCIMSConfig.commonSelector))) {
        let Item: any = item
        const selectElem: any = Item.querySelector('select')
        if (selectElem !== null) {
          const parentElem = selectElem.parentElement
          const prevLabelElem = parentElem.querySelector('label')
          if (
            prevLabelElem?.innerText != null &&
            new RegExp(`\\b${value}`).test(prevLabelElem.innerText)
          ) {
            const dropdownElem = parentElem.querySelector(iCIMSConfig.dropdownSelector)
            if (dropdownElem != null) {
              dropdownElem.classList.remove('dropdown-invisible')
              dropdownElem.ariaExpanded = 'true'
              let value =
                typeof inputValue?.[1] == 'string' ? inputValue?.[1] : inputValue?.[1].name
              if (value) {
                if (inputValue[0] == 'ethnicity') {
                  value = value.includes('/') ? value.split('/') : value
                  value = value.includes(' ') ? value.split(' ').join('|') : value
                }
                Array.from(parentElem.querySelectorAll('ul > li')).forEach((li: any) => {
                  if (new RegExp(`\\b${value}`).test(li.innerText)) {
                    li.click()
                  }
                })
              }
              dropdownElem.classList.add('dropdown-invisible')
              dropdownElem.ariaExpanded = 'false'
            }
          }
        }
      }
    }
  }, 1000)

  setTimeout(() => {
    const experienceButtonClick = () => {
      iframeParent.querySelectorAll(iCIMSConfig.addMoreButton).forEach((item: any) => {
        item.innerText == iCIMSConfig.experienceButtonText && item.click()
      })
    }

    const educationButtonClick = () => {
      iframeParent.querySelectorAll(iCIMSConfig.addMoreButton).forEach((item: any) => {
        item.innerText == iCIMSConfig.educationButtonText && item.click()
      })
    }

    const inputValue: any = getInputValue('experience', UserDetails)
    if (inputValue) {
      const [selectionType, values] = inputValue
      if (values.length > 1) {
        for (const i in values.slice(1)) {
          experienceButtonClick()
        }
      } else {
        experienceButtonClick()
      }
    }

    const Value: any = getInputValue('education', UserDetails)
    if (Value) {
      const [selectionType, values] = Value
      if (values.length > 1) {
        for (const i in values.slice(1)) {
          educationButtonClick()
        }
      } else {
        educationButtonClick()
      }
    }

    setTimeout(() => {
      ExprienceAutoFill(iframeParent, UserDetails)
      educationAutoFill(iframeParent, UserDetails)
    })
  }, 3000)
}
