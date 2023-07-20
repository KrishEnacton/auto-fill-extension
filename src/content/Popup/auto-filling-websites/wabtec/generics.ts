import { months } from '../../../../constants'
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
      const regexOptions = [`^${value[1]}`, `${value[1]}`, `${value[1]}?`, `$\b${value[1]}\b`]
      const regex = new RegExp(regexOptions.join('|'), 'gi')
      if (checkInnerText(item, regex)) {
        item.childNodes[0].click()
      }
      if (key == 'gender') {
        const regex = new RegExp(`${value[1]}`, 'g')
        if (checkInnerText(item, regex)) {
          item.childNodes[0].click()
        }
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

function findMonth(month: string): string {
  const result = months.find((item) => item.name == month)
  console.log({ result })
  if (result?.id) {
    return result?.id.toString()
  }
  return ''
}

export function dateAutoFill(result: Element | null, input_value: [string, any], type: string) {
  if (result) {
    if (type == 'start_year' || type == 'end_year') {
      //@ts-ignore
      result.previousElementSibling.innerHTML = input_value[1]
      result.previousElementSibling?.dispatchEvent(new Event('change', { bubbles: true }))
      //@ts-ignore
      result.value = input_value[1]
      result.ariaValueText = input_value[1]
      result.ariaValueNow = input_value[1]
      result?.dispatchEvent(new Event('change', { bubbles: true }))
    }
    if (type == 'start_month' || type == 'end_month') {
      const month_value = findMonth(input_value[1])
      console.log({ month_value, result })
      const innerhtml = +month_value < 9 ? '0' + month_value : month_value
      console.log({ innerhtml })
      //@ts-ignore
      result.previousElementSibling.innerHTML = innerhtml
      result.previousElementSibling?.dispatchEvent(new Event('change', { bubbles: true }))
      //@ts-ignore
      result.value = month_value
      result.ariaValueText = month_value
      result.ariaValueNow = month_value
      result?.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}

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
        input_value?.[0] == 'start_year' ||
        input_value?.[0] == 'start_month' ||
        input_value?.[0] == 'end_year' ||
        input_value?.[0] == 'end_month'
      ) {
        dateAutoFill(result, input_value, 'start_year')
        dateAutoFill(result, input_value, 'start_month')
        dateAutoFill(result, input_value, 'end_year')
        dateAutoFill(result, input_value, 'end_month')
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
      if (input_value?.[0] == 'start_year' || input_value?.[0] == 'end_year') {
        console.log({ input_value })
        dateAutoFill(result, input_value, 'start_year')
        dateAutoFill(result, input_value, 'end_year')
      }

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
