import { UserInfo } from '../../../../global'
import { dispatchEventOnElement, spreadUserInfo } from '../../../../utils'
import { GreenHouseConfig } from './config'

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

// website specific auto-filling function
export const greenHouseAutoFilling = (userInfo: UserInfo) => {
  const UserDetails = spreadUserInfo(userInfo)
  //@ts-ignore
  const jobContainer = document.querySelector('.jss-e73')
  if (jobContainer?.innerHTML == 'Apply for This Job') {
    //@ts-ignore
    jobContainer.click()
  }

  const education: any = getInputValue('education', UserDetails)
  const educationList = education?.[1]

  const addMore: any = document.querySelector(`a[id="add_education"]`)
  for (let i = 0; i < educationList.length - 1; i++) {
    addMore && addMore.click()
  }
  for (const [key, value] of Object.entries(GreenHouseConfig.selectors)) {
    const inputValue: any = getInputValue(key, UserDetails)
    // for normal text fields
    for (const item of Array.from(document.querySelectorAll(GreenHouseConfig.commonSelector))) {
      //@ts-ignore
      const text = item.innerText
      if (new RegExp(`\\b${value}\\b`, 'i').test(text)) {
        const inputElem = item.querySelector(`input[type='text']`)
        if (inputValue?.[0] == 'city') {
          normalFieldsAutoFill(inputValue?.[1].name, inputElem)
        } else {
          normalFieldsAutoFill(inputValue?.[1], inputElem)
        }
        continue
      }
    }

    // for select dropdown

    for (const i in educationList) {
      for (const [key, value] of Object.entries(GreenHouseConfig.selectors)) {
        //@ts-ignore
        let select: any
        let label
        let localValue
        let endMonth: any = getMonthNumber(educationList[i].end_month)
        let endYear: any = Number(educationList[i].end_year)

        if (value == 'Degree') {
          select = document.querySelector(`select[id*=education_degree_${i}]`)
          if (select) {
            const uniElem =
              select.previousElementSibling.previousElementSibling.parentElement.nextElementSibling.querySelectorAll(
                'input',
              )
            label = select?.previousElementSibling.previousElementSibling.innerText
            localValue = educationList[i].degree
            const endMonthElem = uniElem[0]
            normalFieldsAutoFill(endMonth, endMonthElem)

            const endYearElem = uniElem[1]
            normalFieldsAutoFill(endYear, endYearElem)
          }
        } else if (value == 'Discipline|Major') {
          select = document.querySelector(`select[id*=education_discipline_${i}]`)
          label = select?.previousElementSibling.previousElementSibling.innerText
          localValue = educationList[i].major
        } else if (value == 'Gender') {
          select = document.querySelector(`select[id*=job_application_gender]`)
          label = select?.previousElementSibling.previousElementSibling.innerText
          localValue = UserDetails.gender
        } else if (value == 'Veteran Status') {
          select = document.querySelector(`select[id*=job_application_veteran_status]`)
          label = select?.previousElementSibling.previousElementSibling.innerText
          localValue = UserDetails.is_veteran
        } else if (value == 'Disability Status') {
          select = document.querySelector(`select[id*=job_application_disability_status]`)
          label = select?.previousElementSibling.previousElementSibling.innerText
          localValue = UserDetails.is_disabled
        }
        if (new RegExp(`\\b${value}\\b`, 'i').test(label)) {
          const options = Array.from(select.options)

          const optionValue = findOptionValue(options, localValue)
          select.value = optionValue
          dispatchEventOnElement(select, 'change')
        }
      }
    }
  }
}

function findOptionValue(options: any, targetString: any) {
  for (let i = 0; i < options.length; i++) {
    const cleanSentence = options[i].textContent.replace(/'/g, '').toLowerCase()
    const cleanSubstring = targetString.toLowerCase()

    if (cleanSentence.indexOf(cleanSubstring) !== -1) {
      return options[i].value
    }
  }
  return null
}

function getMonthNumber(monthName: any) {
  const months: any = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  }

  const formattedMonth = months[monthName]
  return formattedMonth ? formattedMonth : 'Invalid month'
}
