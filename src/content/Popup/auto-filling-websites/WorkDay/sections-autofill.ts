import { EducationProps, WorkExperience } from '../../../../global'
import { WorkDayConfig } from './config'
import { ExperienceAutoFill, EducationAutoFill, dropdownSelect } from './generics'

export function PersonalInfoAutofill(userDetails: any) {
  const countryDropdown = document.querySelector(WorkDayConfig['countryCode'])
  if (countryDropdown) {
    //@ts-ignore
    countryDropdown.click()
    const dropdownElem = document.querySelectorAll(WorkDayConfig.countryDropdown)[1]
    if (dropdownElem) dropdownSelect(userDetails, 'countryCode', dropdownElem)
  }
  setTimeout(() => {
    autoFill(userDetails)
  }, 1000)
}
export function EduExpAutofill(educationList: EducationProps[], work_experience: WorkExperience[]) {
  setTimeout(() => {
    if (work_experience?.length > 0) {
      work_experience.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WorkDayConfig.experience_add_more_button).click()
      })
    }
    if (educationList?.length > 0) {
      educationList.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WorkDayConfig.education_add_more_button).click()
      })
    }
  }, 1000)
  setTimeout(() => {
    if (work_experience?.length > 0) {
      for (const index of work_experience.keys()) {
        ExperienceAutoFill(work_experience[index], index + 1)
      }
    }
    if (educationList?.length > 0) {
      for (const index of educationList.keys()) {
        EducationAutoFill(educationList[index], index + 1)
      }
    }
  }, 2000)
}

export function VoluntaryAutofill(userDetails: any) {
  setTimeout(() => {
    const gender = document.querySelector(WorkDayConfig['gender'])
    if (gender) {
      //@ts-ignore
      gender.click()
      const dropdownElem = document.querySelector(WorkDayConfig.dropdown)
      if (dropdownElem) dropdownSelect(userDetails, 'gender', dropdownElem)
    }
    autoFill(userDetails)
  }, 1000)
  // setTimeout(() => {
  //   const ethinicity = document.querySelector(WorkDayConfig['ethinicity'])
  //   if (ethinicity) {
  //     //@ts-ignore
  //     ethinicity.click()
  //     const dropdownElem = document.querySelector(WorkDayConfig.dropdown)
  //     if (dropdownElem) dropdownSelect(userDetails, 'ethinicity', dropdownElem)
  //   }
  //   autoFill(userDetails)
  // }, 2000)
  // setTimeout(() => {
  //   const veteran = document.querySelector(WorkDayConfig['veteran'])
  //   if (veteran) {
  //     //@ts-ignore
  //     ethinicity.click()
  //     const dropdownElem = document.querySelector(WorkDayConfig.dropdown)
  //     if (dropdownElem) dropdownSelect(userDetails, 'ethinicity', dropdownElem)
  //   }
  //   autoFill(userDetails)
  // }, 3000)
}

export function SelfIdentifyAutofill(userDetails: any) {
  const name = document.querySelector('input[data-automation-id="name"]')
  if (name) {
    //@ts-ignore
    name.value = userDetails?.basicInfo?.firstName
    name.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const isDisabled =
    userDetails?.ethnicity?.is_disabled === 'Yes'
      ? document.querySelectorAll(WorkDayConfig.is_disabled)[0]
      : document.querySelectorAll(WorkDayConfig.is_disabled)[1]
  //@ts-ignore
  isDisabled.checked = true
  isDisabled.dispatchEvent(new Event('change', { bubbles: true }))
}

function autoFill(userDetails: any) {
  function isRegExp(value: any): value is RegExp {
    return value instanceof RegExp
  }
  for (const [key, value] of Object.entries(WorkDayConfig) as Array<[string, RegExp | string]>) {
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
