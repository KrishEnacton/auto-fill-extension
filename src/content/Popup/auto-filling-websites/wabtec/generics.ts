import { EducationProps, WorkExperience } from '../../../../global'
import { WabTecConfig } from './config'

export function dropdownSelect(userInfo: any, key: string, dropdownElem: Element) {
  if (!dropdownElem) return

  const checkInnerText = (item: any, regex: RegExp): boolean => {
    return regex.test(item.childNodes[0]?.innerText)
  }

  dropdownElem.childNodes.forEach((item: any) => {
    const value: [string, any] | undefined = Object.entries(userInfo).find((item) => {
      return item[0] === key
    })

    if (typeof value?.[1] === 'string') {
      const regexOptions = [`^${value[1]}`, `${value[1]}?`]
      const regex = new RegExp(regexOptions.join('|'), 'gi')
      if (checkInnerText(item, regex)) {
        item.childNodes[0].click()
      }
    }

    if (typeof value?.[1] === 'object') {
      const regex = new RegExp(`^${value[1].name}`, 'i')

      if (checkInnerText(item, regex)) {
        item.childNodes[0].click()
      }
    }
  })
}

export function checkboxAutofill(document: Element, value: string) {
  //@ts-ignore
  document.checked = value ? value : false
  document?.dispatchEvent(new Event('change', { bubbles: true }))
}

export function dateAutoFill() { }

export function ExperienceAutoFill(formDetails: WorkExperience, index: number) {
  const parentElem = WabTecConfig.work_experienceForm(index)

  for (const [key, value] of Object.entries(WabTecConfig.experience)) {
    const input_value: [string, any] | undefined = Object.entries(formDetails).find((item) => {
      if (item[0] === key) {
        return item
      }
    })

    const result = document.querySelector(value(parentElem))
    if (input_value && result != null) {
      //@ts-ignore
      if (result.type == 'checkbox') {
        checkboxAutofill(result, input_value?.[1])
        continue
      }

      if (
        input_value?.[0] == 'start_year'
        // input_value?.[0] == 'start_month'
        // input_value?.[0] == 'end_year' ||
        // input_value?.[0] == 'end_month'
      ) {
        console.log('check', input_value, result)
        //@ts-ignore
        result.previousElementSibling.innerHTML = input_value[1]
        result.previousElementSibling?.dispatchEvent(new Event('change', { bubbles: true }))
        //@ts-ignore
        result.value = input_value[1]
        result.ariaValueText = input_value[1]
        result.ariaValueNow = input_value[1]
        result?.dispatchEvent(new Event('change', { bubbles: true }))
      }
      // fill the values accordingly
      const value = input_value?.[0] === 'location' ? input_value?.[1].name : input_value?.[1]
      //@ts-ignore
      result.value = value
      result?.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}

export function EducationAutoFill(formDetails: EducationProps, index: number) {
  const parentElem = WabTecConfig.educationForm(index)

  for (const [key, value] of Object.entries(WabTecConfig.education)) {
    const input_value: [string, any] | undefined = Object.entries(formDetails).find((item) => {
      if (item[0] === key) {
        return item
      }
    })
    const result = document.querySelector(value(parentElem))
    if (input_value && result != null) {
      if (input_value?.[0] == 'degree') {
        const degree = document.querySelector(WabTecConfig?.education?.degree(parentElem))
        //@ts-ignore
        degree.click()
        const dropdownElem = Array.from(document.querySelectorAll(WabTecConfig.dropdown)).slice(
          -1,
        )[0]
        if (dropdownElem) dropdownSelect(formDetails, 'degree', dropdownElem)
        continue
      }
      //@ts-ignore
      result.value = input_value?.[1]
      result?.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}
