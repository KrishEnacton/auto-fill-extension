import { EducationProps, WorkExperience } from '../../../../global'
import { dispatchEventOnElement } from '../../../../utils'
import { WorkDayConfig } from './config'
import { ExperienceAutoFill, EducationAutoFill, dropdownSelect } from './generics'

export function PersonalInfoAutofill(userDetails: any) {
  const countryDropdown = document.querySelector(WorkDayConfig['countryCode'])
  if (countryDropdown) {
    //@ts-ignore
    countryDropdown.click()
    const dropdowns = document.querySelectorAll(WorkDayConfig.countryDropdown)
    const dropdownElem = dropdowns[dropdowns.length - 1]
    if (dropdownElem) dropdownSelect(userDetails, 'countryCode', dropdownElem)
  }
  setTimeout(() => {
    autoFill(userDetails)
  }, 1000)
}
export function EduExpAutofill(educationList: EducationProps[], work_experience: WorkExperience[]) {
  setTimeout(() => {
    const deleteEducationButtons = document.querySelectorAll(WorkDayConfig.deleteEducationButton)
    const deleteExperienceButtons = document.querySelectorAll(WorkDayConfig.deleteExperienceButton)
    if (work_experience?.length > 0 && deleteExperienceButtons?.length < work_experience?.length) {
      work_experience.map((item) => {
        //@ts-ignore
        document.querySelector(WorkDayConfig.experience_add_more_button).click()
      })
    }
    if (educationList?.length > 0 && deleteEducationButtons?.length < educationList?.length) {
      educationList.map((item) => {
        //@ts-ignore
        document.querySelector(WorkDayConfig.education_add_more_button).click()
      })
    }
  }, 2000)
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
  }, 4000)
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
  setTimeout(() => {
    const ethnicity = document.querySelector(WorkDayConfig['ethnicity'])
    if (ethnicity) {
      //@ts-ignore
      ethnicity.click()
      const dropdownElem = document.querySelector(WorkDayConfig.dropdown)
      if (dropdownElem) dropdownSelect(userDetails, 'ethnicity', dropdownElem)
    }
    autoFill(userDetails)
  }, 2000)
  setTimeout(() => {
    const veteran = document.querySelector(WorkDayConfig['is_veteran'])
    if (veteran) {
      //@ts-ignore
      veteran.click()
      const dropdownElem = document.querySelector(WorkDayConfig.dropdown)
      if (dropdownElem) dropdownSelect(userDetails, 'is_veteran', dropdownElem)
    }
    autoFill(userDetails)
  }, 3000)
}

export function SelfIdentifyAutofill(userDetails: any) {
  const name = document.querySelector('input[data-automation-id="name"]')
  if (name) {
    //@ts-ignore
    name.value = userDetails?.basicInfo?.firstName
    dispatchEventOnElement(name, 'change')
  }
  console.log(userDetails.ethnicity.is_disabled)
  const isDisabled =
    userDetails?.ethnicity?.is_disabled == 'Yes'
      ? document.querySelectorAll(WorkDayConfig.is_disabled)[0]
      : document.querySelectorAll(WorkDayConfig.is_disabled)[1]

  console.log({ isDisabled })
  //@ts-ignore
  isDisabled.click()
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
            dispatchEventOnElement(result, 'change')
          }
        } else {
          if (result != null) {
            //@ts-ignore
            result.value = input_value?.[1]
            dispatchEventOnElement(result, 'change')
          }
        }
      }
    }
  }
}
