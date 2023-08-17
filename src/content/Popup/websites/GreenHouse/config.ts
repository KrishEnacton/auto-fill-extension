export const GreenHouseConfig = {
  key: 'greenhouse',
  regex:
    /^https?:\/\/(?:www\.)?(?:ixl\.com|boards\.greenhouse\.io|www\.oldmissioncapital\.com)\/[^/]+\/jobs?\/[^?&/]+/,
  commonSelector: `[class*='field']`,
  selectors: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    linkedIn_url: 'LinkedIn Profile',
    portfolio_url: 'Portfolio Link',
  },
}
