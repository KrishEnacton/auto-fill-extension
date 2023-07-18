import { UserInfo } from '../../../../global'
import { WabTecConfig } from './config'

// website specific auto-filling function
export const WabTecAutoFilling = (userInfo: UserInfo) => {
  function isRegExp(value: any): value is RegExp {
    return value instanceof RegExp
  }

  function dropdownSelect(userInfo: any, key: string) {
    const dropdownElem = document.querySelector(WabTecConfig.dropdown)
    if (dropdownElem) {
      dropdownElem.childNodes.forEach((item: any) => {
        const value: [string, any] | undefined = Object.entries(userInfo).find((item) => {
          if (item[0] === key) {
            return item
          }
        })
        if (typeof value == 'string') {
          if (new RegExp(`^${value?.[1]}`, 'i').test(item.childNodes[0]?.innerText)) {
            item.childNodes[0].click()
          }
        }
        if (typeof value == 'object') {
          if (new RegExp(`^${value?.[1].name}`, 'i').test(item.childNodes[0]?.innerText)) {
            item.childNodes[0].click()
          }
        }
      })
    }
  }

  function autoFill(userDetails: any) {
    for (const [key, value] of Object.entries(WabTecConfig) as Array<[string, RegExp | string]>) {
      if (typeof value == 'string' && value !== '') {
        if (isRegExp(value)) {
          continue
        }
        const result = document.querySelector(value)
        const input_value: [string, any] | undefined = Object.entries(userDetails).find((item) => {
          if (item[0] === key) {
            return item
          }
        })
        if (input_value) {
          // fill the values accordingly
          if (input_value?.[0] == 'city' || input_value?.[0] == 'ethnicity') {
            if (result != null) {
              //@ts-ignore
              result.value = input_value?.[1].name
              result?.dispatchEvent(new Event('change', { bubbles: true }))
            }
          } else {
            if (result != null) {
              //@ts-ignore
              result.value = input_value?.[1]
              result?.dispatchEvent(new Event('change', { bubbles: true }))
            }
          }
        }
      }
    }
  }

  function PersonalInfoAutofill(userDetails: any) {
    const countryDropdown = document.querySelector(WabTecConfig['countryCode'])
    if (countryDropdown) {
      //@ts-ignore
      countryDropdown.click()
      dropdownSelect(userDetails, 'countryCode')
    }
    autoFill(userDetails)
  }
  function EduExpAutofill(userDetails: any) {}
  function VoluntaryAutofill(userDetails: any) {
    const gender = document.querySelector(WabTecConfig['gender'])
    console.log({ gender })
    if (gender) {
      //@ts-ignore
      gender.click()
      dropdownSelect(userDetails, 'gender')
    }
    const ethinicity = document.querySelector(WabTecConfig['ethinicity'])
    console.log({ ethinicity })
    if (ethinicity) {
      //@ts-ignore
      ethinicity.click()
      dropdownSelect(userDetails, 'ethinicity')
    }
  }

  const section = document.querySelector(WabTecConfig.section)
  //use mutation observer for detection of DOM changes
  const observer = new MutationObserver(() => {
    console.log('internal observer')
    console.log('called hai', userInfo, section)
    if (section?.innerHTML == 'My Information') {
      PersonalInfoAutofill(userInfo?.basicInfo)
      observer.disconnect()
    }
    if (section?.innerHTML == 'My Experience') {
      EduExpAutofill(userInfo?.education)
      console.log('experience education called')
      observer.disconnect()
    }
    if (section?.innerHTML == 'Voluntary Disclosures') {
      VoluntaryAutofill(userInfo?.ethnicity)
      console.log('Voluntary Disclosures called')
      observer.disconnect()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true, attributes: true })
}
