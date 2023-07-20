import { EducationProps, WorkExperience } from '../../../../global'
import { WabTecConfig } from './config'
import { ExperienceAutoFill, EducationAutoFill, dropdownSelect } from './generics'

export function PersonalInfoAutofill(userDetails: any) {
  const countryDropdown = document.querySelector(WabTecConfig['countryCode'])
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
    if (work_experience?.length > 0) {
      work_experience.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WabTecConfig.experience_add_more_button).click()
      })
    }
    if (educationList?.length > 0) {
      educationList.slice(1).map((item) => {
        //@ts-ignore
        document.querySelector(WabTecConfig.education_add_more_button).click()
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
        console.log('check this')
        EducationAutoFill(educationList[index], index + 1)
      }
    }
  }, 2000)
}

export function VoluntaryAutofill(userDetails: any) {
  console.log({ userDetails }, 'vol')
  setTimeout(() => {
    const gender = document.querySelector(WabTecConfig['gender'])
    if (gender) {
      //@ts-ignore
      gender.click()
      const dropdownElem = document.querySelector(WabTecConfig.dropdown)
      if (dropdownElem) dropdownSelect(userDetails, 'gender', dropdownElem)
    }
    autoFill(userDetails)
  }, 1000)
  // setTimeout(() => {
  //   const ethinicity = document.querySelector(WabTecConfig['ethinicity'])
  //   if (ethinicity) {
  //     //@ts-ignore
  //     ethinicity.click()
  //     const dropdownElem = document.querySelector(WabTecConfig.dropdown)
  //     if (dropdownElem) dropdownSelect(userDetails, 'ethinicity', dropdownElem)
  //   }
  //   autoFill(userDetails)
  // }, 2000)
  // setTimeout(() => {
  //   const veteran = document.querySelector(WabTecConfig['veteran'])
  //   if (veteran) {
  //     //@ts-ignore
  //     ethinicity.click()
  //     const dropdownElem = document.querySelector(WabTecConfig.dropdown)
  //     if (dropdownElem) dropdownSelect(userDetails, 'ethinicity', dropdownElem)
  //   }
  //   autoFill(userDetails)
  // }, 3000)
}

export function SelfIdentifyAutofill(userDetails: any) {
  console.log({ userDetails })
  const name = document.querySelector('input[data-automation-id="name"]')
  if (name) {
    //@ts-ignore
    name.value = userDetails?.basicInfo?.firstName
    name.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const isDisabled =
    userDetails?.ethnicity?.is_disabled === 'Yes'
      ? document.querySelectorAll(WabTecConfig.is_disabled)[0]
      : document.querySelectorAll(WabTecConfig.is_disabled)[1]
  console.log({ isDisabled })
  //@ts-ignore
  isDisabled.checked = true
  isDisabled.dispatchEvent(new Event('change', { bubbles: true }))
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
