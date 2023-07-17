export const WabTecConfig = {
  key: 'wabtec',
  regex:
    /^https:\/\/wabtec\.wd1\.myworkdayjobs\.com\/en-US\/wabtec_careers\/job\/[^/]+\/[^/]+\/apply\/applyManually$/,
  firstName: (document: Document) =>
    document.querySelector("input[data-automation-id='legalNameSection_firstName']"),
  city: (document: Document) =>
    document.querySelector("input[data-automation-id='addressSection_city']"),
  phone: (document: Document) => document.querySelector("input[data-automation-id='phone-number']"),
}

export const WabTecAutoFilling = (userInfo: any) => {
  for (const [key, value] of Object.entries(WabTecConfig)) {
    let userDetails = {}
    Object.entries(userInfo).map((item: any) => {
      if (!item[1].length) {
        userDetails = Object.assign(userDetails, item[1])
        return
      }
      userDetails = Object.assign(userDetails, { [item[0]]: item[1] })
    })
    if (typeof value === 'function') {
      const result = value(document)
      console.log({ userDetails })
      const input_value = Object.entries(userDetails).find((item) => {
        if (item[0] == key) {
          return item
        }
      })
      console.log({ input_value })

      if (input_value?.[0] == 'city' || input_value?.[0] == 'ethnicity') {
        //@ts-ignore
        result.value = input_value[1].name
        result?.dispatchEvent(new Event('change', { bubbles: true }))
        continue
      }
      //@ts-ignore
      result.value = input_value[1]
      result?.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}
