import { WorkDayConfig } from './config'
import {
  EduExpAutofill,
  PersonalInfoAutofill,
  SelfIdentifyAutofill,
  VoluntaryAutofill,
} from './sections-autofill'

// website specific auto-filling function
export const WabTecAutoFilling = (userInfo: any) => {
  const section = document.querySelector(WorkDayConfig.section)
  //use mutation observer for detection of DOM changes
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.target.textContent == 'My Experience') {
        EduExpAutofill(userInfo?.education, userInfo?.experience)
      }
      if (mutation.target.textContent == 'Voluntary Disclosures') {
        VoluntaryAutofill(userInfo?.ethnicity)
      }
      if (mutation.target.textContent == 'Self Identify') {
        SelfIdentifyAutofill(userInfo)
      }
    })
  })
  const target = document.querySelector(WorkDayConfig.section)
  if (target) {
    observer.observe(target, {
      subtree: true,
      childList: false,
      attributes: false,
      characterData: true,
    })
  }
  if (section?.innerHTML == 'My Information') PersonalInfoAutofill(userInfo?.basicInfo)
}
