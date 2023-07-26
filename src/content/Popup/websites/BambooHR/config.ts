export const BambooHRConfig = {
  key: 'bambooHR',
  regex: /^https:\/\/[a-z0-9-]+\.bamboohr\.com\/careers\/\d+$/,
  commonSelector: `[class*='fab-FormColumn']`,
  selectors: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    linkedIn_url: `LinkedIn Profile URL`,
    portfolio_url: `Website, Blog, or Portfolio`,
    city: `City`,
    countryCode: `Country`,
  },
}
