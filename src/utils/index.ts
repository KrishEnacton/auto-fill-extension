import { toast } from 'react-toastify'
import { tabs } from '../constants'
import { EducationProps } from '../global'

export const notify = (message: string, type: string) => {
  if (type == 'success') {
    toast.success(message)
  }
  if (type == 'warning') {
    toast.warning(message)
  }
  if (type == 'error') {
    toast.error(message)
  }
}

export const getNextTabName = (currentSlug: any) => {
  const currentIndex = tabs.findIndex((tab: any) => tab.slug === currentSlug)
  const nextIndex = (currentIndex + 1) % tabs.length
  return tabs[nextIndex].slug
}

export function generateRandomString(length: number) {
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var randomString = ''

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

export function getMonthIndex(month: any) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames.indexOf(month)
}

export function replaceFields(storageData: any, updatedData: any): any {
  const ffdMap: any = {}
  updatedData.forEach((obj: any) => {
    ffdMap[obj.id] = obj
  })

  storageData.forEach((obj: any) => {
    const id = obj.id

    if (ffdMap.hasOwnProperty(id)) {
      const ffdObj = ffdMap[id]

      Object.keys(ffdObj).forEach((key: string) => {
        if (ffdObj[key] !== undefined) {
          obj[key] = ffdObj[key]
        }
      })
    }
  })

  return storageData
}

export function setFormFields(
  e: any,
  setFieldValue: any,
  setEducation: any,
  setOptions: any,
  key: string,
  setNext?: any,
  id?: string,
) {
  setNext(false)
  const value =
    key === 'GPA' ||
    key === 'school_name' ||
    key === 'company_name' ||
    key === 'position_title' ||
    key === 'description'
      ? e.target.value
      : e.name
  setFieldValue(key, value)
  setOptions((prev: any) => ({ ...prev, [key]: value }))
  setEducation((prev: EducationProps) => {
    if (id) {
      return {
        ...prev,
        [key]: value,
        id,
      }
    }
    return {
      ...prev,
      [key]: value,
    }
  })
}

export function updateFormFields(
  e: any,
  updateFormArray: any,
  education: EducationProps,
  setUpdateFormArray: any,
  key: string,
  checkObjectExists: (array: any, desiredID: any) => boolean,
  values?: {
    school_name: string
    major: string
    degree: string
    GPA: string
    start_month: string
    start_year: string
    end_month: string
    end_year: string
  },
  setNext?: any,
) {
  if (education) {
    setNext(false)
    const value =
      key === 'GPA' ||
      key === 'school_name' ||
      key === 'company_name' ||
      key === 'position_title' ||
      key === 'description'
        ? e.target.value
        : e.name
    console.log({ education })
    if (!checkObjectExists(updateFormArray, education?.id)) {
      const newObj: any = { id: education?.id }

      if (
        key === 'start_year' ||
        key === 'end_year' ||
        key === 'start_month' ||
        key === 'end_month'
      ) {
        newObj.start_year = key === 'start_year' ? value : values?.start_year
        newObj.end_year = key === 'end_year' ? value : values?.end_year
        newObj.start_month = key === 'start_month' ? value : values?.start_month
        newObj.end_month = key === 'end_month' ? value : values?.end_month
      } else {
        newObj[key] = value
      }
      setUpdateFormArray((prev: any) => [...prev, newObj])
    } else {
      const updatedArray = updateFormArray.map((obj: any) => {
        if (obj?.id === education?.id) {
          return {
            ...obj,
            [key]: value,
          }
        }
        return obj
      })
      setUpdateFormArray(updatedArray)
    }
  }
}

export function checkObjectExists(array: any, desiredID: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === desiredID) {
      return true // Object with desired ID exists
    }
  }
  return false // Object with desired ID does not exist
}

export const hasEmptyValueWithDateValidation = (array: any) => {
  for (const obj of array) {
    for (const key in obj) {
      const value = obj[key]
      if (value === '' || value === null || value === undefined) {
        return 'empty'
      }
    }

    if (obj.start_year && obj.start_month && obj.end_year && obj.end_month) {
      const startYear = parseInt(obj.start_year)
      const endYear = parseInt(obj.end_year)
      const startMonth = obj.start_month
      const endMonth = obj.end_month

      if (
        startYear > endYear ||
        (startYear === endYear && getMonthIndex(startMonth) > getMonthIndex(endMonth))
      ) {
        return 'validate'
      }
    }
  }

  return 'valid'
}

export function sleep(time: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, time),
  )
}
