import { toast } from 'react-toastify'
import { tabs } from '../constants'
import { EducationProps, UserInfo, WorkExperience } from '../global'

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
          if (key == 'is_working_currently' && ffdObj[key]) {
            obj['end_month'] = ''
            obj['end_year'] = ''
            obj['is_working_currently'] = true
          } else {
            obj[key] = ffdObj[key]
          }
        }
      })
    }
  })

  return storageData
}

export function setFormFields(
  e: any,
  setFieldValue: any,
  setFormElem: any,
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
    key === 'title' ||
    key === 'position_title' ||
    key === 'project_description' ||
    key === 'description'
      ? e.target.value
      : key === 'location'
      ? e
      : key === 'is_working_currently'
      ? e.target.checked
      : e.name
  if (key == 'is_working_currently') {
    setFieldValue('end_month', '')
    setFieldValue('end_year', '')
  }
  setFieldValue(key, value)
  setOptions((prev: any) => ({ ...prev, [key]: value }))
  setFormElem((prev: any) => {
    if (id) {
      return {
        ...prev,
        [key]: value,
        id,
      }
    }
    if (key == 'is_working_currently' && e.target.checked) {
      return {
        ...prev,
        [key]: value,
        end_year: '',
        end_month: '',
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
  section: any,
  setUpdateFormArray: any,
  key: string,
  checkObjectExists: (array: any, desiredID: any) => boolean,
  values?: any,
  setNext?: any,
) {
  if (section) {
    setNext(false)
    const value =
      key === 'GPA' ||
      key === 'school_name' ||
      key === 'company_name' ||
      key === 'title' ||
      key === 'position_title' ||
      key === 'project_description' ||
      key === 'description'
        ? e.target.value
        : e.name
    if (!checkObjectExists(updateFormArray, section?.id)) {
      const newObj: any = { id: section?.id }

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
      } else if (key == 'major') {
        newObj.major = value
        newObj.degree = values?.degree
      } else if (key == 'degree') {
        newObj.major = values?.major
        newObj.degree = value
      } else if (key == 'company_name') {
        newObj.company_name = value
        newObj.position_title = values?.position_title
      } else if (key == 'position_title') {
        newObj.position_title = value
        newObj.company_name = values.company_name
      } else if (key == 'is_working_currently') {
        if (!e.target.checked) {
          newObj.end_month = values.end_month
          newObj.end_year = values.end_year
        }
      } else {
        newObj[key] = value
      }
      setUpdateFormArray((prev: any) => [...prev, newObj])
    } else {
      const updatedArray = updateFormArray.map((obj: any) => {
        if (obj?.id === section?.id) {
          if (key === 'is_working_currently') {
            if (e.target.checked) {
              const updatedObject = removeEndYearAndMonth(obj)
              return {
                ...updatedObject,
                is_working_currently: true,
              }
            } else {
              const updatedObject = removeEndYearAndMonth(obj)
              return {
                ...updatedObject,
                is_working_currently: false,
                end_year: values.end_year,
                end_month: values.end_month,
              }
            }
          }
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

function removeEndYearAndMonth(inputObject: any) {
  const { end_year, end_month, ...updatedObject } = inputObject
  return updatedObject
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

export const emptyFieldsValidation = (array: any) => {
  for (const obj of array) {
    for (const key in obj) {
      const value = obj[key]
      if (value === '' || value === null || value === undefined) {
        return 'empty'
      }
    }
  }
  return 'valid'
}

export function checkMajorExistence(res: any, updatedData: any) {
  const majorsInUpdatedData: any = []
  for (const item of updatedData) {
    const { major, degree } = item
    if (major && degree) {
      if (
        majorsInUpdatedData.some((obj: any) => {
          return obj.major === major && obj.degree === degree
        })
      ) {
        return 'duplicate data'
      }
      majorsInUpdatedData.push({ major, degree })
      const matchingItem = res.find((item: any) => item.major === major && item.degree === degree)
      if (matchingItem) {
        return 'already present'
      }
    }
  }
  return 'success'
}

export function isDuplicateProject(res: any, updatedData: any) {
  const updatedArr: any = []
  for (const item of updatedData) {
    const { title, project_description } = item
    if (title && project_description) {
      if (
        updatedArr.some((obj: any) => {
          return obj.title === title && obj.project_description === project_description
        })
      ) {
        return 'duplicate data'
      }
      updatedArr.push({ title, project_description })
      const matchingItem = res.find(
        (item: any) => item.title === title && item.project_description === project_description,
      )
      if (matchingItem) {
        return 'already present'
      }
    }
  }
  return 'success'
}

export function checkDuplicates(res: any, updatedData: any) {
  // Check for duplicates in updatedData
  const updatedDataDuplicates = updatedData.filter((item: any, index: any, arr: any) => {
    return (
      arr.findIndex(
        (obj: any) =>
          obj.company_name === item.company_name && obj.position_title === item.position_title,
      ) !== index
    )
  })

  // Check for matches between res and updatedData
  const alreadyPresent = res.some((resItem: any) => {
    return updatedData.some(
      (updatedItem: any) =>
        resItem.company_name === updatedItem.company_name &&
        resItem.position_title === updatedItem.position_title,
    )
  })

  // Return the appropriate result
  if (updatedDataDuplicates.length > 0) {
    return 'duplicate'
  } else if (alreadyPresent) {
    return 'already present'
  } else {
    return 'success'
  }
}

export function sleep(time: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, time),
  )
}

export function spreadUserInfo(userInfo: UserInfo) {
  let UserDetails: any = {}
  Object.entries(userInfo).map((item: any) => {
    if (item[1]?.length > 0) {
      Object.assign(UserDetails, { [item[0]]: item[1] })
    } else {
      Object.assign(UserDetails, { ...item[1] })
    }
  })
  return UserDetails
}

export function dispatchEventOnElement(element: any, event: any) {
  element.dispatchEvent(new Event(event, { bubbles: true, cancelable: true }))
}
