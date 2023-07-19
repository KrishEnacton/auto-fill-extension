import { EducationProps, WorkExperience } from '../../../../global'
import { WabTecConfig } from './config'
import { ExperienceAutoFill, EducationAutoFill, dropdownSelect } from './generics'

export function PersonalInfoAutofill(userDetails: any) {
  const countryDropdown = document.querySelector(WabTecConfig['countryCode'])
  console.log({ countryDropdown })
  if (countryDropdown) {
    //@ts-ignore
    countryDropdown.click()
    const dropdownElem = document.querySelectorAll(WabTecConfig.countryDropdown)[1]
    if (dropdownElem) dropdownSelect(userDetails, 'countryCode', dropdownElem)
  }
  setTimeout(() => {
    autoFill(userDetails)
  }, 1000)
}
export function EduExpAutofill(educationList: EducationProps[], work_experience: WorkExperience[]) {
  setTimeout(() => {
    if (work_experience.length > 0) {
      work_experience.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WabTecConfig.experience_add_more_button).click()
      })
    }
    if (educationList.length > 0) {
      educationList.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WabTecConfig.education_add_more_button).click()
      })
    }
  }, 1000)
  setTimeout(() => {
    for (const index of work_experience.keys()) {
      ExperienceAutoFill(work_experience[index], index + 1)
    }
    for (const index of educationList.keys()) {
      console.log('check this')
      EducationAutoFill(educationList[index], index + 1)
    }
  }, 2000)
}

export function VoluntaryAutofill(userDetails: any, observer: MutationObserver) {
  const gender = document.querySelector(WabTecConfig['gender'])
  if (gender) {
    //@ts-ignore
    gender.click()
    const dropdownElem = document.querySelector(WabTecConfig.dropdown)
    if (dropdownElem) dropdownSelect(userDetails, 'gender', dropdownElem)
  }
  setTimeout(() => {
    autoFill(userDetails)
  }, 1000)
  const ethinicity = document.querySelector(WabTecConfig['ethinicity'])
  if (ethinicity) {
    //@ts-ignore
    ethinicity.click()
    const dropdownElem = document.querySelector(WabTecConfig.dropdown)
    if (dropdownElem) dropdownSelect(userDetails, 'ethinicity', dropdownElem)
  }
  setTimeout(() => {
    autoFill(userDetails)
  }, 1000)
  observer.disconnect()
}

function autoFill(userDetails: any) {
  function isRegExp(value: any): value is RegExp {
    return value instanceof RegExp
  }
  for (const [key, value] of Object.entries(WabTecConfig) as Array<[string, RegExp | string]>) {
    if (typeof value == 'string' && value !== '') {
      if (isRegExp(value)) {
        continue
      }
      const input_value: [string, any] | undefined = Object.entries(userDetails).find((item) => {
        if (item[0] === key) {
          return item
        }
      })

      const result = document.querySelector(value)
      if (input_value) {
        // fill the values accordingly
        if (
          input_value?.[0] == 'city' ||
          input_value?.[0] == 'ethnicity' ||
          input_value?.[0] == 'location'
        ) {
          console.log({ input_value, result })
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
