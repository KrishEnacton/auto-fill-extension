import { LaceworkConfig } from './scrappersWebsites/lacework'

const ScrapperWebsites = [LaceworkConfig]

export const autoFilling = (userInfo: any) => {
  const filteredSelector: any = ScrapperWebsites.find((selector) => {
    if (window.location.href.includes(selector.href)) {
      return selector
    }
  })

  if (filteredSelector?.isShadow) {
    console.log('called')
    shadowDOMAutofilling(filteredSelector)
  } else if (filteredSelector.isIframe) {
    console.log(filteredSelector.rootElem(document))
    IFrameAutofilling(filteredSelector, userInfo)
  } else normalDOMAutofilling(filteredSelector)
}

export const shadowDOMAutofilling = (selector: any) => {
  Object.entries(selector).map((item) => {})
  //@ts-ignore
  Array.from(document.querySelectorAll('input')).forEach((input) => {
    console.log(input.id)
    if (selector) {
      const value = Object.entries(selector).find((item) => item[0] == input.id)
      console.log({ value })
      //@ts-ignore
      input.value = value?.[1]
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }
  })
}

export const normalDOMAutofilling = (selector: any) => {
  //@ts-ignore
  Array.from(document.querySelectorAll('input')).forEach((input) => {
    console.log(input.id)
    if (selector) {
      const value = Object.entries(selector).find((item) => item[0] == input.id)
      console.log({ value })
      //@ts-ignore
      input.value = value?.[1]
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }
  })
}

export const IFrameAutofilling = (selector: any, userInfo: any) => {
  const rootElem = selector.rootElem(document)
  console.log(rootElem.src)
  const newWindow = window.open(rootElem.src, '_blank')
  newWindow?.addEventListener('load', () => {
    console.log('called')
    Object.entries(selector).forEach((item: any) => {
      console.log({ item })
      if (item[1]) {
        const value = Object.entries(userInfo.basicInfo).find((i) => i[0] == item[0])
        //@ts-ignore
        item[1].value = value?.[1]
        item[1].dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
  })
}
