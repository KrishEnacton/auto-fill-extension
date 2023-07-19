import { WabTecConfig } from './config'
import { EduExpAutofill, PersonalInfoAutofill, VoluntaryAutofill } from './sections-autofill'

// website specific auto-filling function
export const WabTecAutoFilling = (userInfo: any) => {
  const section = document.querySelector(WabTecConfig.section)
  //use mutation observer for detection of DOM changes
  const observer = new MutationObserver(() => {
    console.log('internal observer')
    observer.disconnect()
    if (section?.innerHTML == 'My Experience') {
      console.log('experience education called', userInfo)
      EduExpAutofill(userInfo?.education, userInfo?.experience)
    }
    if (section?.innerHTML == 'Voluntary Disclosures') {
      console.log('Voluntary Disclosures called')
      VoluntaryAutofill(userInfo?.ethnicity, observer)
    }
  })
  const target = document.querySelector(WabTecConfig.section)
  if (target) {
    console.log({ target })
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })
  }
  if (section?.innerHTML == 'My Information') PersonalInfoAutofill(userInfo?.basicInfo)
}
